#!/usr/bin/env bash
# scripts/verify.sh [--full] — nanyaru (yarn Berry, Next 16, no tests).
# Quick: typegen -> typecheck -> eslint --max-warnings=0. --full: + next build. English-only output.
set -uo pipefail
cd "$(dirname "$0")/.." || exit 1
FULL=0; [ "${1:-}" = "--full" ] && FULL=1
if [ -f .wt.env ]; then set -a; . ./.wt.env; set +a; fi

redact() { printf '%s ' "$@" | sed -E 's#([A-Za-z_]*URL=)[^[:space:]]*#\1<redacted>#g; s#((postgres(ql)?|mysql)://)[^[:space:]@]*@#\1***@#g'; }
step() { local name=$1; shift; echo; echo "==> $name: $(redact "$@")"; "$@" || { echo "FAILED: $name"; exit 1; }; }

step "typegen"   yarn next typegen
step "typecheck" yarn tsc --noEmit
step "lint"      yarn eslint . --max-warnings=0
echo; echo "==> test: no test runner in this repo (skipped)"
if [ "$FULL" -eq 1 ]; then
  step "build" yarn build
fi
echo
if [ "$FULL" -eq 1 ]; then echo "OK: verify --full passed"; else echo "OK: verify passed"; fi
