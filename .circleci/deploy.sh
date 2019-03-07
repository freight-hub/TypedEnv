#!/bin/bash -e

# make sure -x (debugging) is off so we do not print the npm token in the logs
set +x

if [ -f ~/.npmrc ]; then mv ~/.npmrc ~/.npmrc.bak; fi
echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > ~/.npmrc
echo "@freighthub:registry=https://registry.npmjs.org/" >> ~/.npmrc

yarn publish:package

if [ -f ~/.npmrc.bak ]; then mv ~/.npmrc.bak ~/.npmrc; fi