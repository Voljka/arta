<?
	// require ($_SERVER['DOCUMENT_ROOT'].'/config/db.config.php');
	require ('../config/db.config.php');

    $params = json_decode(file_get_contents('php://input'),true);
    $id = $params['id'];

	$query = "DELETE FROM orders ";
	$query .= " WHERE id=$id ";
	echo $query;
	$result = mysql_query($query) or die(mysql_error());

	$query = "DELETE FROM positions ";
	$query .= " WHERE order_id=$id ";

	$result = mysql_query($query) or die(mysql_error());
	echo $query;
?>