<?
	require ('../config/db.config.php');

	$table = "orders";

	$query = "SELECT $table.*, workers.lastname manager_name, consumers.name consumer_name, details.order_sum FROM $table ";
	$query .= " LEFT JOIN workers ON workers.id = $table.worker";
	$query .= " LEFT JOIN consumers ON consumers.id = $table.consumer";
	$query .= " LEFT JOIN (";

	$query .= 		"SELECT order_id, SUM(price*quantity) order_sum FROM positions GROUP BY order_id ";

	$query .=       ") AS details ON details.order_id = $table.id ";
	$query .=       "ORDER BY orders.ordered_at DESC";
	
	// $query .= "";

	// echo $query;

	$result = mysql_query($query) or die(mysql_error());

	$respond = array();
	while ($row = mysql_fetch_assoc($result)) 
	{
		$respond[] = $row;
	};

	echo json_encode($respond);
?>