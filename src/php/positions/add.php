<?

	// require ($_SERVER['DOCUMENT_ROOT'].'/config/db.config.php');
	require ('../config/db.config.php');

    $commodity = $_POST['commodity'];
    $order = $_POST['order'];
    $planned_delivery_at = $_POST['planned_delivery_at'];
    $quantity = $_POST['quantity'];
    $price = $_POST['price'];
    $notes = $_POST['notes'];
	//$curdate = date("Y-m-d");

	/* Таблица MySQL, в которой хранятся данные */
	$table = "positions";
	
	$query = "INSERT INTO $table (commodity, order_id, planned_delivery_at, quantity, price, notes) VALUES (";
	$query .="$commodity,";
	$query .="$order,";
	$query .="'$planned_delivery_at',";
	$query .="$quantity,";
	$query .="$price,";
	$query .="'$notes')";
	
	echo $query;
	$result = mysql_query($query) or die(mysql_error());
	
?>