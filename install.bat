npm install webpack -g
npm install
cd server
composer install
php "./vendor/propel/propel/bin/propel.php" sql:build
php "./vendor/propel/propel/bin/propel.php" sql:insert
webpack
cd ..