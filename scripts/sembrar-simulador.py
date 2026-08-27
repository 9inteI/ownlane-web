#!/usr/bin/env python3
"""Siembra salidas en el simulador para poder capturar Progreso y el detalle.

La app guarda todo en JSON dentro de Application Support (plan.json, runs.json).
Un simulador recien instalado no tiene salidas, asi que Progreso sale vacio y
no hay ninguna salida que abrir. Esto retrasa el plan cinco semanas, marca como
hechas las sesiones que quedan en el pasado y les inventa una salida coherente:
ruta por Malaga, parciales, pulsaciones y cadencia.

Los numeros son FICTICIOS. Sirven para la captura, no son datos reales.

Uso:  python3 scripts/sembrar-simulador.py <udid>
"""
import json, math, os, random, subprocess, sys, uuid, shutil

UDID = sys.argv[1] if len(sys.argv) > 1 else 'E49B61B1-7BEB-46F4-A4B2-54CB7385A4A9'
BUNDLE = 'com.rubendiaz.ownlane'
SEMANAS_ATRAS = 5
DESFASE = SEMANAS_ATRAS * 7 * 86400

base = subprocess.run(['xcrun', 'simctl', 'get_app_container', UDID, BUNDLE, 'data'],
                      capture_output=True, text=True, check=True).stdout.strip()
sop = os.path.join(base, 'Library', 'Application Support')
plan_p, runs_p = os.path.join(sop, 'plan.json'), os.path.join(sop, 'runs.json')

for p in (plan_p, runs_p):
    if os.path.exists(p) and not os.path.exists(p + '.bak'):
        shutil.copy(p, p + '.bak')

plan = json.load(open(plan_p))

# 1. Retrasar el plan para que haya semanas ya corridas.
plan['createdAt'] -= DESFASE
plan['goalDate'] -= DESFASE
for semana in plan['weeks']:
    for s in semana['sessions']:
        s['plannedDate'] -= DESFASE

ahora = plan['createdAt'] + DESFASE  # el "hoy" original del plan

# Centro de Malaga: la ruta de las capturas de App Store sale por aqui.
LAT, LON = 36.7213, -4.4214

def ruta(vueltas=1.0, puntos=180, radio=0.0075):
    """Un bucle cerrado, ligeramente irregular para que no parezca un ovalo."""
    fuera = []
    for i in range(puntos):
        t = (i / puntos) * 2 * math.pi * vueltas
        rizo = 1 + 0.16 * math.sin(t * 3) + 0.07 * math.cos(t * 5)
        fuera.append({
            'lat': round(LAT + math.sin(t) * radio * rizo * 0.72, 6),
            'lon': round(LON + math.cos(t) * radio * rizo * 1.35, 6),
        })
    return fuera

def pulsaciones(segundos, media, pico, bloques, semilla):
    """Sube y baja con los bloques de correr y andar, con deriva al final.

    Con una sinusoide limpia la grafica canta que es inventada: un pulso real
    nunca dibuja arcos identicos. Aqui la onda base lleva ruido correlacionado
    (un paseo aleatorio suave, no ruido blanco, que temblaria demasiado), la
    subida es mas rapida que la bajada —el corazon sube antes de lo que baja— y
    cada bloque cuesta un poco distinto.
    """
    rnd = random.Random(semilla)
    fuera = []
    t, deambular = 0.0, 0.0
    peso = [1 + rnd.uniform(-0.09, 0.09) for _ in range(bloques + 2)]
    while t < segundos:
        frac = t / segundos
        ciclo = frac * bloques
        dentro = ciclo % 1
        # Sube en el primer 40% del bloque y baja en el 60% restante.
        subida = math.sin(dentro / 0.4 * math.pi / 2) if dentro < 0.4 \
            else math.cos((dentro - 0.4) / 0.6 * math.pi / 2)
        # Centrada en -1..1: si la onda solo sube (0..1) la media se va
        # veinte pulsaciones por encima de la que se pretendia.
        fase = subida * 2 - 1
        deambular = deambular * 0.72 + rnd.uniform(-1.5, 1.5)
        deriva = frac * 9
        bpm = media + fase * (pico - media) * 0.8 * peso[int(ciclo)] + deriva + deambular
        fuera.append({'offset': round(t, 1), 'bpm': round(min(pico + 3, max(96, bpm)), 1)})
        t += 15
    return fuera

def parciales(km, ritmo):
    return [{'km': i + 1, 'seconds': int(ritmo + (i - km / 2) * 7)} for i in range(km)]

# 2. Las sesiones que quedan en el pasado se dan por hechas, con su salida.
esfuerzos = ['right', 'easy', 'right', 'hard', 'right', 'easy', 'right', 'right', 'right']
salidas, hechas = [], 0

for semana in plan['weeks']:
    for s in semana['sessions']:
        if s['plannedDate'] >= ahora - 86400:
            continue
        pasos = s.get('steps', [])
        duracion = sum(p.get('seconds', 0) for p in pasos) or 1920
        corriendo = sum(p.get('seconds', 0) for p in pasos if p.get('kind') == 'run')
        bloques = max(1, sum(1 for p in pasos if p.get('kind') == 'run'))

        # Va mejorando: mas metros por minuto y menos pulso segun avanza el plan.
        avance = hechas / 12
        mpm = 118 + avance * 26
        metros = duracion / 60 * mpm
        km = max(1, int(metros // 1000))
        ritmo = int(duracion / (metros / 1000))
        media = 146 - avance * 9

        s['completedAt'] = s['plannedDate'] + duracion
        salidas.append({
            'id': str(uuid.uuid4()).upper(),
            'sessionID': s['id'],
            'date': s['plannedDate'],
            'elapsedSeconds': int(duracion),
            'meters': round(metros, 1),
            'blocksPlanned': bloques,
            'blocksDone': bloques,
            'blockPaces': [round(ritmo + (i - bloques / 2) * 9, 1) for i in range(bloques)],
            'route': ruta(radio=0.0042 + km * 0.0009),
            'splits': parciales(km, ritmo),
            'heartRates': pulsaciones(duracion, media, media + 24, bloques, semilla=hechas * 977 + 13),
            'averageCadence': round(163 + avance * 7, 1),
            'effort': esfuerzos[hechas % len(esfuerzos)],
            'hadPain': False,
            'isIndoor': False,
        })
        hechas += 1

json.dump(plan, open(plan_p, 'w'))
json.dump(salidas, open(runs_p, 'w'))
print(f'{hechas} salidas sembradas; plan retrasado {SEMANAS_ATRAS} semanas')
if salidas:
    u = salidas[-1]
    print(f'ultima: {u["elapsedSeconds"] // 60} min, {u["meters"] / 1000:.2f} km, '
          f'{len(u["splits"])} parciales, {len(u["heartRates"])} pulsaciones')
