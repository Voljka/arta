<?

	// require ($_SERVER['DOCUMENT_ROOT'].'/config/db.config.php');
	require ('../config/db.config.php');

    $region = $_POST['region'];
    $delivery_day = $_POST['delivery_day'];

	/* Таблица MySQL, в которой хранятся данные */
	$table = "delivery_days";
	
	$query = "INSERT INTO $table (region, delivery_day) VALUES (";
	$query .="$region,";
	$query .="$delivery_day)";
	
	$result = mysql_query($query) or die(mysql_error());
	
	echo $query;
?>