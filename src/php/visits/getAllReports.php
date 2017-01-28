<?
	require ('../config/db.config.php');

	$table = "visit_reports";

	$query = "SELECT $table.*, visited.visits_count, workers.lastname FROM $table ";
	$query .= " LEFT JOIN workers ON workers.id = $table.worker ";
	$query .= " LEFT JOIN (";

	$query .= 		"SELECT report, count(id) visits_count FROM visits GROUP BY report ";

	$query .=       ") AS visited ON visited.report = $table.id ";
	$query .= " ORDER BY $table.visited_at DESC";
	
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