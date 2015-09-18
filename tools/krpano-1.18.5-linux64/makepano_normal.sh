#!/bin/bash
# 하다가 안되서 안쓰는걸로...;;
export MYAPP_WRAPPER="`readlink -f "$0"`"

HERE="`dirname "$MYAPP_WRAPPER"`"

if [[ -n "$1" ]]; then
  ./"$HERE"/krpanotools makepano -config=templates/normal_custom.config $1 || exit $?
  exit 0
else
  echo Missing Argument! - Image Path
  exit 1
fi