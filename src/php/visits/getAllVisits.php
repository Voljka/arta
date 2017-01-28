<?
	require ('../config/db.config.php');

	$table = "visits";

	$query = "SELECT $table.*, consumers.name FROM $table ";
	$query .= 	" LEFT JOIN consumers ON consumers.id = $table.consumer ";
	$query .= " ORDER BY consumers.name";
	
	$result = mysql_query($query) or die(mysql_error());

	$respond = array();
	while ($row = mysql_fetch_assoc($result)) 
	{
		$respond[] = $row;
	};

	echo json_encode($respond);
?>