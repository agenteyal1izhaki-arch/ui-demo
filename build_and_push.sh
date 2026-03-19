#!/usr/bin/env bash
set -euo pipefail
REPO_OWNER=${REPO_OWNER:-"<your-username-or-org>"}
REPO_NAME=${REPO_NAME:-"ui-demo"}
REPO_URL="https://github.com/${REPO_OWNER}/${REPO_NAME}.git"
mkdir -p "${REPO_NAME}/docs"
git init
cp -r docs "${REPO_NAME}/docs"
cd "${REPO_NAME}"
git add .
git commit -m "Initial static UI demo for GitHub Pages"
git branch -M main
git remote add origin "${REPO_URL}"
git push -u origin main
