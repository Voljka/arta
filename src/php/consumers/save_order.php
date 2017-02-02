<?
	// require ($_SERVER['DOCUMENT_ROOT'].'/config/db.config.php');
	require ('../config/db.config.php');

    $params = json_decode(file_get_contents('php://input'),true);

    $orderlist = $params['order'];

	/* Таблица MySQL, в которой хранятся данные */
	$table = "consumers";

    foreach ($orderlist as $current_order) {
        $order_num = $current_order['route_order_id'];
        $order_id = $current_order['id'];
        $query = "UPDATE $table SET route_order_id = $order_num ";
        $query .= " WHERE id=$order_id";

        // echo $query;
        // file_put_contents('saving_order.log', $query . '\n');

        $result = mysql_query($query) or die(mysql_error());
    }
    echo 'Finished';

?>