<?

	require ('../config/db.config.php');

    $firstname = $_POST['firstname'];
    $lastname = $_POST['lastname'];
    $mail = $_POST['mail'];
    $phone = $_POST['phone'];

	/* Таблица MySQL, в которой хранятся данные */
	$table = "workers";
	
	$query = "INSERT INTO $table (firstname, lastname, mail, phone) VALUES (";
	$query .="'$firstname',";
	$query .="'$lastname',";
	$query .="'$mail',";
	$query .="'$phone')";
	
	$result = mysql_query($query) or die(mysql_error());
	
	echo $query;
?>