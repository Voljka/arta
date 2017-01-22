<?

	// require ($_SERVER['DOCUMENT_ROOT'].'/config/db.config.php');
	require ('../config/db.config.php');

    $name = $_POST['name'];
    $price1 = $_POST['price1'];
    $price2 = $_POST['price2'];
    $price3 = $_POST['price3'];
    $photo = $_POST['photo'];
	//$curdate = date("Y-m-d");

	/* Таблица MySQL, в которой хранятся данные */
	$table = "commodities";
	
	$query = "INSERT INTO $table (name, photo, price1, price2, price3) VALUES (";
	$query .="'$name',";
	$query .="'$photo',";
	$query .="$price1,";
	$query .="$price2,";
	$query .="$price3)";
	
	$result = mysql_query($query) or die(mysql_error());
	
	echo $query;
?>