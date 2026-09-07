#!/usr/bin/env bash
# Copy Maestro's failure screenshot(s) into ./maestro-debug with clean names, for
# upload as a CI artifact. Maestro writes one screenshot per failed flow to
# ~/.maestro/tests/<run>/screenshot-*.png; the per-step modal screenshots (in
# example/e2e/screenshots) are intentionally excluded.
mkdir -p maestro-debug
i=0
for f in ~/.maestro/tests/*/screenshot-*.png; do
  [ -e "$f" ] || break
  cp "$f" "maestro-debug/failure-$i.png"
  i=$((i + 1))
done
