#!/usr/bin/env bash
set -euo pipefail

rn_version="${1:-}"

npm pkg delete scripts.prepare

if [ -n "$rn_version" ]; then
  npm --prefix example pkg set "dependencies.react-native=$rn_version" "overrides.react-native=$rn_version"
  npm --prefix example install --no-save
else
  npm --prefix example ci
fi
