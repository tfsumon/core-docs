#!/bin/bash

# check if we are on main branch
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [[ "$BRANCH" != "main" ]]; then
  exit 1
fi

# cleanup and update module configuration
hugo mod clean
hugo mod get -u ./...
hugo mod tidy

# add updates to next commit
git add go.mod
git add go.sum
