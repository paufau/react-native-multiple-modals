#!/usr/bin/env bash
set -euo pipefail

log_path="${RUNNER_TEMP:-/tmp}/web-server.log"

cd example

npx expo export --platform web
npx expo serve --port 8081 > "$log_path" 2>&1 &
npm run e2e:run -- --platform web --run-steps generation tests
