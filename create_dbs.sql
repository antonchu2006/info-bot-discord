CREATE DATABASE IF NOT EXISTS targetas_discord;
USE targetas_discord;
create table if not exists users(id INT AUTO_INCREMENT PRIMARY KEY, avatar varchar(100), discord varchar(32), steam varchar(32), mc varchar(32), epic varchar(32), riot varchar(32), cr varchar(32), coc varchar(32), tlf varchar(32), ig varchar(32));