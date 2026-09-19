#!/usr/bin/env bash
# Runs one authored bio batch through the full pipeline: report, validation, write,
# post-write deep diff, test suite. Stops at the first failure so nothing half-applies.
#
# Usage: scripts/bio-ship.sh <batch-number> <report-slug>
#   e.g. scripts/bio-ship.sh 13 gynecology
set -euo pipefail

n="$1"
slug="$2"
batch="scripts/bio-batches/batch-${n}.mjs"
report="docs/doctor-bio-rewrite/batch-${n}-${slug}.md"

node scripts/build-bio-report.mjs "$batch" "$report"
node scripts/check-bio-batch.mjs "$report"
node scripts/apply-bio-batch.mjs "$report"
node scripts/verify-bio-batch.mjs
npm test 2>&1 | grep -E "^# (pass|fail)"
