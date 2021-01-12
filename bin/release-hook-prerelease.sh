#!/bin/bash

# cleanup and update module configuration
hugo mod clean
hugo mod get -u ./...
hugo mod tidy

# add updates to next commit
git add go.mod
git add go.sum
