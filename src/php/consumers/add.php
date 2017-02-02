<?

	// require ($_SERVER['DOCUMENT_ROOT'].'/config/db.config.php');
	require ('../config/db.config.php');

    // $params = json_decode(file_get_contents('php://input'),true);

    $name = $_POST['name'];
    $region = $_POST['region'];
    $payment_option = $_POST['payment_option'];
    $place = $_POST['place'];
    $representatives = $_POST['representatives'];
    $mail = $_POST['mail'];
    $notes = $_POST['notes'];
    $worker = $_POST['worker'];
    $is_vip = $_POST['is_vip'];
    $tt_type = $_POST['tt_type'];
    $person = $_POST['person'];
    $route_order_id = $_POST['route_order_id'];

    // $name = $params['name'];
    // $region = $params['region'];
    // $payment_option = $params['payment_option'];
    // $place = $params['place'];
    // $representatives = $params['representatives'];
    // $mail = $params['mail'];
    // $notes = $params['notes'];
    // $worker = $params['worker'];
    // $is_vip = $params['is_vip'];
    // $tt_type = $params['tt_type'];
    // $person = $params['person'];

	//$curdate = date("Y-m-d");

	/* Таблица MySQL, в которой хранятся данные */
	$table = "consumers";

	$query = "INSERT INTO $table (name, region, payment_option, place, representatives, mail, notes, worker, person, tt_type, route_order_id, is_vip) VALUES (";
	$query .="'$name',";
	$query .="$region,";
	$query .="$payment_option,";
	$query .="'$place',";
	$query .="'$representatives',";
	$query .="'$mail',";
	$query .="'$notes',";
	$query .="$worker,";
	$query .="'$person',";
    $query .="$tt_type,";
    $query .="$route_order_id,";
	$query .="$is_vip)";

	file_put_contents('insert_new_consumer.log', $query);
	echo $query;
	
	$result = mysql_query($query) or die(mysql_error());
	
?>