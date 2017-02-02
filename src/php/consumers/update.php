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
    $tt_type = $_POST['tt_type'];
    $person = $_POST['person'];
    $route_order_id = $_POST['route_order_id'];

	/* Таблица MySQL, в которой хранятся данные */
	$table = "consumers";

	$query = "UPDATE $table SET name='$name', notes='$notes', mail='$mail', place='$place', region=$region, payment_option=$payment_option, worker=$worker, representatives='$representatives', person='$person', tt_type=$tt_type, is_vip=$is_vip, route_order_id=$route_order_id ";
	$query .= " WHERE id=$id ";

	echo $query;

	$result = mysql_query($query) or die(mysql_error());

?>