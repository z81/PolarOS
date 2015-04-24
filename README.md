# PolarOS
dir 320 server http://193.161.12.8 docs https://polaros-docs.herokuapp.com

# Установка зависимостей
1. nodejs - https://nodejs.org/download/
2. npm install webpack -g
3. php - http://windows.php.net/download/
4. Добавииь пусть к php в переменную PATH
5. composer - https://getcomposer.org/Composer-Setup.exe

# Установка
0. Ведео установки на windows [![Установка и запуск PolarOS на windows ](http://img.youtube.com/vi/LQBDNKhHjt8/0.jpg)](http://www.youtube.com/watch?v=LQBDNKhHjt8)
1. Создать свой форк
2. git clone --recursive АДРЕС ФОРКА //например git clone --recursive git@github.com:z81/PolarOS.git
3. cd PolarOS
4. npm install
5. cd server
6. composer install
7. php "./vendor/propel/propel/bin/propel.php" sql:build
8. php "./vendor/propel/propel/bin/propel.php" sql:insert

# Запуск
1. cd server
2. php run.php
3. cd ../
4. webpack -w -c -p
5. Назначить папку public в любом web-сервере публичной

# Настройка web-сервера
## lighttpd
Для windows можно скачаь тут - http://lighttpd.dtech.hu
Файл conf/lighttpd.conf
Установить модули "mod_access","mod_accesslog","mod_setenv"
В версии для win уже установлены, нужно только раскоментировать.
Добавить в файл текст:

$HTTP["url"] =~ "\.js.gz$" {
  setenv.add-response-header = (
      "Content-Encoding" => "gzip",
      "Content-Type" => "text/javascript" 
   )
}

$HTTP["url"] =~ "\.(woff|woff2|ttf|svg)$" {
  setenv.add-response-header = (
      "Access-Control-Allow-Origin" => "*"
   )
}
и указать путь к папке public
server.document-root        = server_root + "/htdocs/public"



# Соглашения
В компонентах ОС данные передаются только по ссылкам на переменные, с верхнеего компонента до нижнего.
В компонентах используются вызовы к внешнему коду, вместо этого используюся callback функции.
...


