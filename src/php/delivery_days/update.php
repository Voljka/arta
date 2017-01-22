<?
	// require ($_SERVER['DOCUMENT_ROOT'].'/config/db.config.php');
	require ('../config/db.config.php');

    $region = $_POST['region'];
    $id = $_POST['id'];
    $delivery_day = $_POST['delivery_day'];
	//$curdate = date("Y-m-d");

	/* Таблица MySQL, в которой хранятся данные */
	$table = "delivery_days";

	$query = "UPDATE $table SET delivery_day=$delivery_day, region=$region";
	$query .= " WHERE id=$id ";
	
	$result = mysql_query($query) or die(mysql_error());
?>