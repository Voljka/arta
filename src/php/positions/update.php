<?
	// require ($_SERVER['DOCUMENT_ROOT'].'/config/db.config.php');
	require ('../config/db.config.php');

    $id = $_POST['id'];
    $commodity = $_POST['commodity'];
    $order = $_POST['order'];
    $planned_delivery_at = $_POST['planned_delivery_at'];
    $quantity = $_POST['quantity'];
    $price = $_POST['price'];
    $notes = $_POST['notes'];


	/* Таблица MySQL, в которой хранятся данные */
	$table = "positions";

	$query = "UPDATE $table SET commodity=$commodity, order_id=$order, planned_delivery_at='$planned_delivery_at', quantity=$quantity, price=$price, notes='$notes'";
	$query .= " WHERE id=$id ";
	
	echo $query;
	$result = mysql_query($query) or die(mysql_error());

?>