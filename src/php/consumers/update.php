<?
	// require ($_SERVER['DOCUMENT_ROOT'].'/config/db.config.php');
	require ('../config/db.config.php');

    $id = $_POST['id'];
    $name = $_POST['name'];
    $region = $_POST['region'];
    $payment_option = $_POST['payment_option'];
    $place = $_POST['place'];
    $representatives = $_POST['representatives'];
    $mail = $_POST['mail'];
    $notes = $_POST['notes'];
    $worker = $_POST['worker'];
    $is_vip = $_POST['is_vip'];
	//$curdate = date("Y-m-d");

	/* Таблица MySQL, в которой хранятся данные */
	$table = "consumers";

	$query = "UPDATE $table SET name='$name', notes='$notes', mail='$mail', place='$place', region=$region, payment_option=$payment_option, worker=$worker, representatives='$representatives', is_vip=$is_vip";
	$query .= " WHERE id=$id ";

	echo $query;

	$result = mysql_query($query) or die(mysql_error());

?>