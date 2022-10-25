#!/bin/bash

cd ./back-office
npm install
cd ../game
npm install
npm run build
cp -r ./build ../back-office
cd ../back-office
nodemon index.js