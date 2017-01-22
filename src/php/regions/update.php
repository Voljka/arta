<?
	require ('../config/db.config.php');

    $name = $_POST['name'];
    $id = $_POST['id'];

	/* Таблица MySQL, в которой хранятся данные */
	$table = "regions";

	$query = "UPDATE $table SET name='$name'";
	$query .= " WHERE id=$id ";
	
	$result = mysql_query($query) or die(mysql_error());
?>