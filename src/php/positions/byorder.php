<?
	require ('../config/db.config.php');

	$table = "positions";

	$id = $_GET['order'];

	$query = "SELECT $table.*, commodities.name commodity_name, orders_extended.*  FROM $table ";
	$query .= " LEFT JOIN commodities ON commodities.id = $table.commodity";
	$query .= " LEFT JOIN (";
	$query .= 		"SELECT orders.id order_id, consumers.name customer_name FROM orders ";
	$query .= 			"LEFT JOIN consumers ON consumers.id = orders.consumer ";
	$query .= 			") AS orders_extended ON orders_extended.order_id = $table.order_id ";
	$query .= "WHERE $table.order_id=$id";
	
	$result = mysql_query($query) or die(mysql_error());

	$respond = array();
	while ($row = mysql_fetch_assoc($result)) 
	{
		$respond[] = $row;
	};

	echo json_encode($respond);
?>