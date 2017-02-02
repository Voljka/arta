<?
	// require ($_SERVER['DOCUMENT_ROOT'].'/config/db.config.php');
	require ('../config/db.config.php');

    // $name = $_POST['name'];
    // $id = $_POST['id'];
    // $price1 = $_POST['price1'];
    // $price2 = $_POST['price2'];
    // $price3 = $_POST['price3'];
    // // $photoUrl = $_POST['photoUrl'];
    // // $photoUrl = '';
    // $photo = $_POST['photo'];
    // $is_old = $_POST['is_old'];
	//$curdate = date("Y-m-d");

    $params = json_decode(file_get_contents('php://input'),true);

    $id = $params['id'];
    $name = $params['name'];
    $price1 = $params['price1'];
    $price2 = $params['price2'];
    $price3 = $params['price3'];
    $photo = $params['photo'];
    $is_old = $params['is_old'];

	/* Таблица MySQL, в которой хранятся данные */
	$table = "commodities";

	$query = "UPDATE $table SET name='$name', price1=$price1, price2=$price2, price3=$price3, photo='$photo', is_old=$is_old ";
	$query .= " WHERE id=$id ";
	
	echo $query;
	$result = mysql_query($query) or die(mysql_error());
?>