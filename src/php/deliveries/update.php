<?
	// require ($_SERVER['DOCUMENT_ROOT'].'/config/db.config.php');
	require ('../config/db.config.php');

    $position = $_POST['position'];
    $id = $_POST['id'];
    $delivered_at = $_POST['delivered_at'];
    $notes = $_POST['notes'];
    $reported_at = $_POST['reported_at'];
	//$curdate = date("Y-m-d");

	/* Таблица MySQL, в которой хранятся данные */
	$table = "deliveries";

	$query = "UPDATE $table SET position=$position, delivered_at='$delivered_at', reported_at='$reported_at', notes='$notes'";
	$query .= " WHERE id=$id ";

	echo $query;
	
	$result = mysql_query($query) or die(mysql_error());
?>