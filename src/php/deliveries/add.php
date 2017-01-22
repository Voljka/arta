<?

	// require ($_SERVER['DOCUMENT_ROOT'].'/config/db.config.php');
	require ('../config/db.config.php');

    $position = $_POST['position'];
    $delivered_at = $_POST['delivered_at'];
    $notes = $_POST['notes'];
    $reported_at = $_POST['reported_at'];
	//$curdate = date("Y-m-d");

	/* Таблица MySQL, в которой хранятся данные */
	$table = "deliveries";
	
	$query = "INSERT INTO $table (position, delivered_at, notes, reported_at) VALUES (";
	$query .="$position,";
	$query .="'$delivered_at',";
	$query .="'$notes',";
	$query .="'$delivered_at')";
	
	$result = mysql_query($query) or die(mysql_error());
	
	echo $query;
?>