<?
	require ('../config/db.config.php');

	$table = "consumers";

	$query = "SELECT $table.*, tt_types.name tt_type_name FROM $table";
	$query .= " LEFT JOIN tt_types ON tt_types.id = $table.tt_type ";
	$query .= " ORDER BY $table.name ";
	
	$result = mysql_query($query) or die(mysql_error());

	$respond = array();
	while ($row = mysql_fetch_assoc($result)) 
	{
		$respond[] = $row;
	};

	echo json_encode($respond);
?>