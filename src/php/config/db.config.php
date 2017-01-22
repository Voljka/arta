<?php
	header('Content-Type: text/html; charset=utf-8');	
	
	$hostname = "idesk.mysql.ukraine.com.ua"; 
	$username = "idesk_arta";
	$password = "8snapxrh";
	$dbName = "idesk_arta"; 

	// Создаем соединение 
	mysql_connect($hostname, $username, $password) or die ("Не могу создать соединение");
	// Выбираем базу данных. Если произойдет ошибка - вывести ее 
	mysql_select_db($dbName) or die (mysql_error());
	mysql_query("SET NAMES 'utf8'");
	mysql_query("SET CHARACTER SET 'utf8'");
?>