<?
	require ('../config/db.config.php');

	$table = "positions";

	$id = $_GET['id'];

	$query = "SELECT $table.commodity, $table.quantity, $table.price, $table.notes position_note, orders.consumer, orders.worker, orders.planned_delivery_at, orders.form, orders.ordered_at, consumers.name consumer_name, consumers.place, consumers.representatives, consumers.notes consumer_note, commodities.name commodity_name, commodities.price1, commodities.price2, commodities.price3 FROM $table ";
	$query .= " LEFT JOIN orders ON $table.order_id = orders.id ";
	$query .= " LEFT JOIN consumers ON orders.consumer = consumers.id ";
	$query .= " LEFT JOIN commodities ON $table.commodity = commodities.id ";

	if ($id) {
		$query .= " WHERE $table.order_id=$id;";
	}

	// echo $query;
	
	$result = mysql_query($query) or die(mysql_error());

	$respond = array();
	while ($row = mysql_fetch_assoc($result)) 
	{
		$respond[] = $row;
	};

	echo json_encode($respond);
?>