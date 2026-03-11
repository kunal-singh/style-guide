#!/usr/bin/env bash
set -euo pipefail

BRANCH=$(git symbolic-ref --short HEAD 2>/dev/null || echo "")

# Exempt protected branches
case "$BRANCH" in
  main|master|develop|release/*|hotfix/*|changeset-release/*)
    exit 0
    ;;
esac

# Validate pattern: <type>/<issue>-<description>
if ! echo "$BRANCH" | grep -qE '^[a-z]+/[0-9]+-[a-z0-9-]+$'; then
  echo "Branch name '$BRANCH' does not match required pattern: <type>/<issue>-<description>"
  echo "Examples: feat/123-add-login, fix/456-null-pointer"
  exit 1
fi
