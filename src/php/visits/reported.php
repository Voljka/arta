<?
	// require ($_SERVER['DOCUMENT_ROOT'].'/config/db.config.php');
	require ('../config/db.config.php');

    $params = json_decode(file_get_contents('php://input'),true);
    $manager = $params['id'];
    $manager = 1;

    $curtime = date("Y-m-d H:i:s");
	
	$cur_day_of_the_week = date("w");
	$curdate = date("Y-m-d");

	$start_date = date("Y-m-d", strtotime($curdate) - ($cur_day_of_the_week - 1)*24*60*60);

	$table = "visits";
	$manager_name = "";

	for ($j = 0; $j < 5; $j++) {

		$nextdate = date("Y-m-d", strtotime($start_date) + $j*24*60*60);
	
		$table = "visit_reports";

		$query = "UPDATE $table SET reported_at='$curtime'";
		$query .= " WHERE worker=$manager AND visited_at='$nextdate'";

		$result = mysql_query($query) or die(mysql_error());

	}
	/* Таблица MySQL, в которой хранятся данные */
	echo $result;
?>