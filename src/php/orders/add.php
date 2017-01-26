<?

	// require ($_SERVER['DOCUMENT_ROOT'].'/config/db.config.php');
	require ('../config/db.config.php');

    $consumer = $_POST['consumer'];
    $worker = $_POST['worker'];
    $ordered_at = $_POST['ordered_at'];
    $reported_at = $_POST['reported_at'];
    $planned_delivery_at = $_POST['planned_delivery_at'];
    $form = $_POST['form'];
	//$curdate = date("Y-m-d");

	/* Таблица MySQL, в которой хранятся данные */
	$table = "orders";
	
	$query = "INSERT INTO $table (consumer, worker, ordered_at, reported_at, planned_delivery_at, form) VALUES (";
	$query .="consumer,";
	$query .="worker,";
	$query .="'$ordered_at',";
	$query .="'$reported_at',";
	$query .="'$planned_delivery_at',";
	$query .="$form)";
	
	$result = mysql_query($query) or die(mysql_error());
	
	echo $query;
?>