#!/bin/bash
# Ayudante para sacar capturas del simulador en las cuatro combinaciones de
# tema e idioma. El tema y el idioma se cambian con simctl (fiable y scriptable);
# la navegacion entre pestanas hay que hacerla con taps porque la app no
# registra ningun esquema de URL.
U=E49B61B1-7BEB-46F4-A4B2-54CB7385A4A9
B=com.rubendiaz.ownlane
DEST=/Users/user/ownlane-web/capturas-crudas

case "$1" in
  estado)   # estado <light|dark> <es|en>
    xcrun simctl ui "$U" appearance "$2" >/dev/null
    xcrun simctl terminate "$U" "$B" 2>/dev/null
    sleep 1
    xcrun simctl launch "$U" "$B" -AppleLanguages "($3)" >/dev/null
    sleep 3.5
    echo "estado: $2 / $3"
    ;;
  captura)  # captura <nombre>
    xcrun simctl io "$U" screenshot --type=png "$DEST/$2.png" 2>/dev/null
    echo "$2.png"
    ;;
esac
