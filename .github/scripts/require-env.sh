#!/usr/bin/env bash
# Fails with a readable list when any of the named secrets/variables is empty,
# instead of letting the build break later with an obscure signing error.
# Usage: require-env.sh --secrets NAME... --vars NAME...
# Each missing item says which tab it belongs to, so nothing ends up registered in the wrong one.
set -euo pipefail

kind=""
missing=0
for arg in "$@"; do
  case "$arg" in
    --secrets) kind="Secrets" ;;
    --vars) kind="Variables" ;;
    *)
      if [ -z "$kind" ]; then
        echo "require-env.sh: use --secrets or --vars before the names" >&2
        exit 2
      fi
      if [ -z "${!arg:-}" ]; then
        echo "::error title=Configuração ausente::$arg não está cadastrado. Cadastre em Settings → Secrets and variables → Actions → aba $kind (veja docs/PIPELINE.md)."
        missing=$((missing + 1))
      fi
      ;;
  esac
done

if [ "$missing" -gt 0 ]; then
  exit 1
fi
echo "Todos os itens necessários estão configurados."
