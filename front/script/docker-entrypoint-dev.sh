#!/bin/sh

printf "Yarn install...\n\n"
rm -rf yarn.lock
yarn

chown -R 1000:1000 node_modules

printf "Building and watching app...\n\n"

# csr
ng serve --hmr --port=80 --host="0.0.0.0" --public-host="test.galaxy.ru"
