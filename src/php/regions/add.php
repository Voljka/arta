<?

	require ('../config/db.config.php');

    $name = $_POST['name'];

	/* Таблица MySQL, в которой хранятся данные */
	$table = "regions";
	
	$query = "INSERT INTO $table (name) VALUES (";
	$query .="'$name')";
	
	$result = mysql_query($query) or die(mysql_error());
	
	echo $query;
?>