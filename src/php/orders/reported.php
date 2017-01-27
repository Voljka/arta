<?
	// require ($_SERVER['DOCUMENT_ROOT'].'/config/db.config.php');
	require ('../config/db.config.php');

    $params = json_decode(file_get_contents('php://input'),true);
    $id = $params['id'];
	$curdate = date("Y-m-d H:i:s");

	/* Таблица MySQL, в которой хранятся данные */
	$table = "orders";

	$query = "UPDATE $table SET reported_at='$curdate'";
	$query .= " WHERE id=$id ";

	$result = mysql_query($query) or die(mysql_error());
	echo $curdate;
?>