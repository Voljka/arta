<?
	require ('../config/db.config.php');

	$table = "consumers";

	$query = "SELECT * FROM $table";
	
	$result = mysql_query($query) or die(mysql_error());

	$respond = array();
	while ($row = mysql_fetch_assoc($result)) 
	{
		$respond[] = $row;
	};

	echo json_encode($respond);
?>