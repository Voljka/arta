<?

	// require ($_SERVER['DOCUMENT_ROOT'].'/config/db.config.php');
	require ('../config/db.config.php');

    $params = json_decode(file_get_contents('php://input'),true);

    // $name = $_POST['name'];
    // $price1 = $_POST['price1'];
    // $price2 = $_POST['price2'];
    // $price3 = $_POST['price3'];
    // // $photo = $_FILES['photo'];
    // $photo = $_POST['photo'];
    // // $photo = '';
    // $is_old = $_POST['is_old'];

    $name = $params['name'];
    $price1 = $params['price1'];
    $price2 = $params['price2'];
    $price3 = $params['price3'];
    // $photo = $_FILES['photo'];
    $photo = $params['photo'];
    // $photo = '';
    $is_old = $params['is_old'];

	//$curdate = date("Y-m-d");

	/* Таблица MySQL, в которой хранятся данные */
	$table = "commodities";
	
	$query = "INSERT INTO $table (name, photo, price1, price2, price3, is_old) VALUES (";
	$query .="'$name',";
	$query .="'$photo',";
	$query .="$price1,";
	$query .="$price2,";
	$query .="$price3,";
	$query .="$is_old)";

	// $uploaddir = '/home/idesk/i-desk.xyz/arta-lugansk/jpg/';
	// // $uploadfile = $uploaddir . basename($_FILES['photo']['name']);
	// $uploadfile = $uploaddir . basename($photo['name']);

	// echo '<pre>';
	// if (move_uploaded_file($photo['tmp_name'], $uploadfile)) {
	//     echo "Файл корректен и был успешно загружен.\n";
	// } else {
	//     echo "Возможная атака с помощью файловой загрузки!\n";
	// }

	echo $query;
	
	$result = mysql_query($query) or die(mysql_error());
	
	// echo json_encode($photo);
?>