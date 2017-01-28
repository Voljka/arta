<?
	require ('../config/db.config.php');

	$table = "positions";

	$id = $_GET['order'];
	$curdate = date("Y-m-d"). " 00:00:00";

	$query = "SELECT $table.commodity, $table.quantity, $table.price, $table.notes position_note, orders.consumer, orders.worker, orders.planned_delivery_at, orders.form, orders.ordered_at, consumers.name consumer_name, consumers.place, consumers.representatives, consumers.notes consumer_note, consumers.is_vip, commodities.name commodity_name, commodities.price1, commodities.price2, commodities.price3, workers.lastname, deliveries.reported_at delivery_reported_at, deliveries.notes delivery_note FROM $table ";

	$query .= " LEFT JOIN orders ON $table.order_id = orders.id ";
	$query .= " LEFT JOIN consumers ON orders.consumer = consumers.id ";
	$query .= " LEFT JOIN commodities ON $table.commodity = commodities.id ";
	$query .= " LEFT JOIN workers ON orders.worker = workers.id ";
	$query .= " LEFT JOIN deliveries ON deliveries.position = $table.id ";

	$query .= " WHERE $table.planned_delivery_at >= '$curdate' ";

	$query .= " ORDER BY $table.planned_delivery_at DESC, $table.order_id ";

	$result = mysql_query($query) or die(mysql_error());

	$respond = array();
	while ($row = mysql_fetch_assoc($result)) 
	{
		$respond[] = $row;
	};

	echo json_encode($respond);
?>