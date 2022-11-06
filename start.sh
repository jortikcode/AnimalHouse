#!/bin/bash

cd ./backend
npm install
cd ../game
npm install
npm run build
cp -r ./build ../backend
cd ../backend
npm start