#!/usr/bin/env python3
"""Saca los articulos de Aprende del repo de la app a MDX bilingue.

Los articulos ya estan escritos, con sus fuentes citadas, y ya estan traducidos:
LearnLibrary.swift tiene el espanol y Localizable.xcstrings el ingles. No hay
nada que redactar ni que traducir aqui, solo que convertir.

One-off: se ejecuta a mano y los MDX se versionan, para que el repo de la web
no dependa del repo de la app.

Uso:  python3 scripts/extract-learn.py
"""
import json, os, re, sys

APP = '/Users/user/Desktop/SaaS/OwnLane'
FUENTE = f'{APP}/OwnLane/Features/Learn/LearnLibrary.swift'
CADENAS = f'{APP}/OwnLane/Localizable.xcstrings'
DESTINO = 'src/content/aprende'

swift = open(FUENTE, encoding='utf-8').read()
xc = json.load(open(CADENAS, encoding='utf-8'))['strings']

def ingles(es):
    """El ingles de una cadena, tal y como lo tiene la app."""
    v = xc.get(es, {}).get('localizations', {}).get('en', {}).get('stringUnit', {}).get('value')
    if v is None:
        print(f'  SIN TRADUCIR: {es[:70]}...', file=sys.stderr)
    return v or es

def desescapa(s):
    return s.replace('\\"', '"').replace('\\n', '\n').replace('\\\\', '\\')

CADENA = r'String\(localized:\s*"((?:[^"\\]|\\.)*)"\)'

# Cada articulo empieza en "static let X = Article(" y acaba antes del siguiente
# "// MARK:" o del final del enum.
bloques = re.split(r'\n    // MARK: - ', swift)[1:]

articulos = []
for bruto in bloques:
    m = re.search(r'id:\s*"([^"]+)"', bruto)
    if not m:
        continue
    art = {'id': m.group(1), 'order': len(articulos)}
    art['title'] = desescapa(re.search(r'title:\s*' + CADENA, bruto).group(1))
    art['teaser'] = desescapa(re.search(r'teaser:\s*' + CADENA, bruto).group(1))
    art['category'] = re.search(r'category:\s*\.(\w+)', bruto).group(1)
    art['minutes'] = int(re.search(r'minutes:\s*(\d+)', bruto).group(1))
    art['evidence'] = re.search(r'evidence:\s*\.(\w+)', bruto).group(1)

    # Bloques del cuerpo, en orden de aparicion.
    cuerpo = bruto[bruto.index('blocks: ['):bruto.index('sources: [')]
    bloques_art = []
    patron = re.compile(
        r'\.(paragraph|heading|callout|warning)\(\s*' + CADENA + r'\s*\)'
        r'|\.bullets\(\[(.*?)\]\)'
        r'|\.figure\(\.(\w+),\s*caption:\s*' + CADENA + r'\s*\)',
        re.S)
    for g in patron.finditer(cuerpo):
        if g.group(1):
            bloques_art.append({'t': g.group(1), 'texto': desescapa(g.group(2))})
        elif g.group(3) is not None:
            puntos = [desescapa(x) for x in re.findall(CADENA, g.group(3))]
            bloques_art.append({'t': 'bullets', 'puntos': puntos})
        else:
            bloques_art.append({'t': 'figure', 'nombre': g.group(4),
                                'texto': desescapa(g.group(5))})
    art['blocks'] = bloques_art

    # Fuentes.
    fuentes_txt = bruto[bruto.index('sources: ['):]
    art['sources'] = [
        {'authors': a, 'title': t, 'publication': p, 'year': int(y), 'url': u}
        for a, t, p, y, u in re.findall(
            r'\.init\(authors:\s*"((?:[^"\\]|\\.)*)",\s*'
            r'title:\s*"((?:[^"\\]|\\.)*)",\s*'
            r'publication:\s*"((?:[^"\\]|\\.)*)",\s*year:\s*(\d+),\s*'
            r'url:\s*"([^"]+)"\)', fuentes_txt, re.S)
    ]
    articulos.append(art)

# Slugs en ingles: el id de la app esta en espanol.
#
# Se eligen pensando en lo que se busca, no traduciendo el titulo: quien tiene
# el problema escribe «why do i get a side stitch», no «transient abdominal
# pain». El slug es la unica parte de la URL que Google lee como texto.
SLUG_EN = {
    've-mas-despacio': 'go-slower',
    'flato': 'side-stitch',
    'lesiones-primeras-semanas': 'first-weeks-injuries',
    'estirar-antes': 'stretching-before',
    'primeras-zapatillas': 'first-shoes',
    'fuerza': 'strength',
    'cadencia': 'cadence',
    'dormir': 'sleep-and-injury',
    'agujetas': 'stretching-doesnt-help-soreness',
    'ayunas': 'fasted-running',
    'volver': 'coming-back-after-a-break',
    'calor': 'running-in-heat',
    'superficies': 'running-surfaces',
    'semaforo-dolor': 'when-to-stop-running',
    'recuperacion': 'foam-roller-ice-compression',
    'rodilla-corredor': 'runners-knee',
    'respirar-nariz': 'nasal-breathing',
    'musica': 'music-and-running',
    'cuanto-tardas': 'how-long-to-see-progress',
}

def escapa_yaml(s):
    return s.replace('\\', '\\\\').replace('"', '\\"')

def a_mdx(art, lang):
    t = (lambda s: s) if lang == 'es' else ingles
    slug = art['id'] if lang == 'es' else SLUG_EN[art['id']]
    fm = [
        '---',
        f'title: "{escapa_yaml(t(art["title"]))}"',
        f'teaser: "{escapa_yaml(t(art["teaser"]))}"',
        f'category: {art["category"]}',
        f'minutes: {art["minutes"]}',
        f'evidence: {art["evidence"]}',
        f'lang: {lang}',
        f'order: {art["order"]}',
        f'translationKey: {art["id"]}',
        f'slug: {slug}',
        'updated: 2026-08-27',
        'sources:',
    ]
    for s in art['sources']:
        fm += [
            f'  - authors: "{escapa_yaml(s["authors"])}"',
            f'    title: "{escapa_yaml(s["title"])}"',
            f'    publication: "{escapa_yaml(s["publication"])}"',
            f'    year: {s["year"]}',
            f'    url: "{s["url"]}"',
        ]
    fm.append('---')

    cuerpo = ['import Callout from "../../../components/Callout.astro";',
              'import Warning from "../../../components/Warning.astro";',
              'import Figura from "../../../components/Figura.astro";', '']
    for b in art['blocks']:
        if b['t'] == 'paragraph':
            cuerpo += [t(b['texto']), '']
        elif b['t'] == 'heading':
            cuerpo += [f'## {t(b["texto"])}', '']
        elif b['t'] == 'bullets':
            cuerpo += [f'- {t(p)}' for p in b['puntos']] + ['']
        elif b['t'] == 'callout':
            cuerpo += [f'<Callout>{t(b["texto"])}</Callout>', '']
        elif b['t'] == 'warning':
            cuerpo += [f'<Warning>{t(b["texto"])}</Warning>', '']
        elif b['t'] == 'figure':
            cap = escapa_yaml(t(b['texto']))
            cuerpo += [f'<Figura nombre="{b["nombre"]}" pie="{cap}" />', '']
    return '\n'.join(fm) + '\n\n' + '\n'.join(cuerpo)

for lang in ('es', 'en'):
    carpeta = f'{DESTINO}/{lang}'
    os.makedirs(carpeta, exist_ok=True)
    for art in articulos:
        if lang == 'en' and art['id'] not in SLUG_EN:
            print(f'  SIN SLUG EN INGLES: {art["id"]} — anadelo a SLUG_EN', file=sys.stderr)
            continue
        slug = art['id'] if lang == 'es' else SLUG_EN[art['id']]
        open(f'{carpeta}/{slug}.mdx', 'w', encoding='utf-8').write(a_mdx(art, lang))

print(f'{len(articulos)} articulos x 2 idiomas')
for a in articulos:
    print(f'  {a["id"]:28} {a["evidence"]:11} {len(a["blocks"])} bloques  {len(a["sources"])} fuentes')
