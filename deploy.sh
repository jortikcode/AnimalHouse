# install backend dependencies
cd backend
npm install
cd ..

# install game dependencies
cd game
npm install
cd ..

# install frontoffice dependencies
cd frontoffice
npm install
cd ..

# build and copy game to backend folder
cd game
npm run build
rm -rf gameBuild
mv dist gameBuild
cp -r ./gameBuild ../backend
cd ..

# build and copy frontoffice to backend folder
cd frontoffice
npm run build
rm -rf frontofficeBuild
mv build frontofficeBuild
cp -r ./frontofficeBuild ../backend
cd ..

# copy files to department server
cd backend
rsync --perms --chmod=a+rwx -av * .env.development .env.production node_modules juan.jaramillosaa@lucia.cs.unibo.it:/home/web/site212222/html/AnimalHouse/backend
cd ../back-office
rsync --perms --chmod=a+rwx -av * juan.jaramillosaa@lucia.cs.unibo.it:/home/web/site212222/html/AnimalHouse/back-office
