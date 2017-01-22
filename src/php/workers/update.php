<?
	// require ($_SERVER['DOCUMENT_ROOT'].'/config/db.config.php');
	require ('../config/db.config.php');

    $id = $_POST['id'];
    $firstname = $_POST['firstname'];
    $lastname = $_POST['lastname'];
    $mail = $_POST['mail'];
    $phone = $_POST['phone'];
	//$curdate = date("Y-m-d");

	/* Таблица MySQL, в которой хранятся данные */
	$table = "workers";

	$query = "UPDATE $table SET firstname='$firstname', lastname='$lastname', mail='$mail', phone='$phone'";
	$query .= " WHERE id=$id ";
	
	$result = mysql_query($query) or die(mysql_error());
?>