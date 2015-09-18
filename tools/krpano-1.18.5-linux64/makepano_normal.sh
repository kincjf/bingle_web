#!/bin/bash
# 쓸려고 했는데 잘 안되서 일단 안 쓰는걸로...;;
export MYAPP_WRAPPER="`readlink -f "$0"`"

HERE="`dirname "$MYAPP_WRAPPER"`"

if [[ -n "$1" ]]; then
  ./"$HERE"/krpanotools makepano -config=templates/normal_custom.config $1 || exit $?
  exit 0
else
  echo Missing Argument! - Image Path
  exit 1
fi