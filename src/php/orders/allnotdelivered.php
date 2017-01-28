<?
	require ('../config/db.config.php');

	$table = "orders";
	$curdate = date("Y-m-d"). " 00:00:00";

	$query = "SELECT $table.*, workers.lastname manager_name, consumers.name consumer_name, details.order_sum, details.position_reported_at FROM $table ";
	$query .= " LEFT JOIN workers ON workers.id = $table.worker";
	$query .= " LEFT JOIN consumers ON consumers.id = $table.consumer";
	$query .= " LEFT JOIN (";

	$query .= 	"SELECT order_id, SUM(price*quantity) order_sum, SUM(deliveries.reported_at) position_reported_at FROM positions ";
	$query .= 		" LEFT JOIN deliveries ON deliveries.position = positions.id ";
	$query .= " GROUP BY order_id ";

	$query .=       ") AS details ON details.order_id = $table.id ";
	$query .=       "WHERE details.order_sum > 0 AND $table.planned_delivery_at >= '$curdate' ";	
	$query .=       "ORDER BY orders.planned_delivery_at";

	$result = mysql_query($query) or die(mysql_error());

	$respond = array();
	while ($row = mysql_fetch_assoc($result)) 
	{
		$respond[] = $row;
	};

	echo json_encode($respond);
?>