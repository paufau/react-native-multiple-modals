#!/usr/bin/env bash
mkdir -p maestro-debug

latest=$(find "$HOME/.maestro/tests" -type f -name '*.png' -print0 2>/dev/null \
  | xargs -0 ls -t 2>/dev/null | head -1)

if [ -n "$latest" ] && [ -e "$latest" ]; then
  cp "$latest" maestro-debug/failure.png
fi
