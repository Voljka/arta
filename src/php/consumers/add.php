<?

	// require ($_SERVER['DOCUMENT_ROOT'].'/config/db.config.php');
	require ('../config/db.config.php');

    $name = $_POST['name'];
    $region = $_POST['region'];
    $payment_option = $_POST['payment_option'];
    $place = $_POST['place'];
    $representatives = $_POST['representatives'];
    $mail = $_POST['mail'];
    $notes = $_POST['notes'];
    $worker = $_POST['worker'];
    $is_vip = $_POST['is_vip'];
	//$curdate = date("Y-m-d");

	/* Таблица MySQL, в которой хранятся данные */
	$table = "consumers";

	$query = "INSERT INTO $table (name, region, payment_option, place, representatives, mail, notes, worker, is_vip) VALUES (";
	$query .="'$name',";
	$query .="$region,";
	$query .="$payment_option,";
	$query .="'$place',";
	$query .="'$representatives',";
	$query .="'$mail',";
	$query .="'$notes',";
	$query .="$worker,";
	$query .="$is_vip)";

	echo $query;
	
	$result = mysql_query($query) or die(mysql_error());
	
?>