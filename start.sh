#!/bin/bash

# install backend dependencies
cd ./backend
npm install

# install game dependencies & build
#cd ../game
#npm install
#npm run build

# copy build into backend i.o.t. render it
#cp -r ./build ../backend
cd ../backend

npm start DEVELOPMENT