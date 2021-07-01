#!/bin/bash

if [ "$EUID" -ne 0 ]
  then 
  echo
  echo "[!] Please run as root"
  exit
fi


check_nodejs="which node"
$check_nodejs > /dev/null
status=$?
[ $status -eq 0 ] && echo "[+] Node JS esta instalado" || apt install nodejs

check_npm="which npm"
$check_npm > /dev/null
status=$?
[ $status -eq 0 ] && echo "[+] NPM esta instalado" || apt install npm

npm init

npm i discord
npm i mysql

echo "[+] Todo se ha instalado correctamente"