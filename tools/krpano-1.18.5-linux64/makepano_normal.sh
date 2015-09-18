#!/bin/bash
# �ϴٰ� �ȵǼ� �Ⱦ��°ɷ�...;;
export MYAPP_WRAPPER="`readlink -f "$0"`"

HERE="`dirname "$MYAPP_WRAPPER"`"

if [[ -n "$1" ]]; then
  ./"$HERE"/krpanotools makepano -config=templates/normal_custom.config $1 || exit $?
  exit 0
else
  echo Missing Argument! - Image Path
  exit 1
fi