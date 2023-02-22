#!/bin/bash

# install backend dependencies
cd ./backend
npm install

# install game dependencies & build
cd ../game
rm -rf gameBuild
npm install
npm run build

# copy build into backend i.o.t. render it
mv dist gameBuild
cp -r ./gameBuild ../backend

# install frontoffice dependencies & build
cd ../frontoffice
rm -rf frontofficeBuild
npm install
npm run build

# copy build into backend i.o.t. render it
# copy build into backend i.o.t. render it
mv build frontofficeBuild
cp -r ./frontofficeBuild ../backend

cd ../backend

npm start DEVELOPMENT