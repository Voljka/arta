<?
	// require ($_SERVER['DOCUMENT_ROOT'].'/config/db.config.php');
	require ('../config/db.config.php');

    $id = $_POST['id'];
    $consumer = $_POST['consumer'];
    $worker = $_POST['worker'];
    $ordered_at = $_POST['ordered_at'];
    $reported_at = $_POST['reported_at'];
    $form = $_POST['form'];
	//$curdate = date("Y-m-d");

	/* Таблица MySQL, в которой хранятся данные */
	$table = "orders";

	$query = "UPDATE $table SET consumer=$consumer, worker=$worker, ordered_at='$ordered_at', reported_at='$reported_at', form=$form";
	$query .= " WHERE id=$id ";
	
	$result = mysql_query($query) or die(mysql_error());
?>