<?
	require ('../config/db.config.php');

	$table = "visits";

	$report_id = $_GET['report'];

	$query = "SELECT $table.*, consumers.name consumer_name, consumers.region, consumers.place, regions.name region_name FROM $table ";
	$query .= 	" LEFT JOIN consumers ON consumers.id = $table.consumer ";
	$query .= 	" LEFT JOIN regions ON regions.id = consumers.region ";
	$query .= " WHERE $table.report=$report_id ";
	$query .= " ORDER BY consumers.route_order_id";
	
	$result = mysql_query($query) or die(mysql_error());

	$respond = array();
	while ($row = mysql_fetch_assoc($result)) 
	{
		$respond[] = $row;
	};

	echo json_encode($respond);
?>