#!/usr/bin/env sh

set -e

npm run build:prod

cd dist

git init
git add -A
git commit -m 'New Deployment'
git push -f git@github.com:felixkpt/vue-portfolio.git master:vue-portfolio-master

cd -