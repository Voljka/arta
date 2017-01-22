<?
	// require ($_SERVER['DOCUMENT_ROOT'].'/config/db.config.php');
	require ('../config/db.config.php');

    $name = $_POST['name'];
    $id = $_POST['id'];
    $price1 = $_POST['price1'];
    $price2 = $_POST['price2'];
    $price3 = $_POST['price3'];
    $photo = $_POST['photo'];
	//$curdate = date("Y-m-d");

	/* Таблица MySQL, в которой хранятся данные */
	$table = "commodities";

	$query = "UPDATE $table SET name='$name', price1=$price1, price2=$price2, price3=$price3, photo='$photo'";
	$query .= "WHERE id=$id ";
	
	$result = mysql_query($query) or die(mysql_error());
?>