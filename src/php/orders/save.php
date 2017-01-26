<?
	// require ($_SERVER['DOCUMENT_ROOT'].'/config/db.config.php');
	require ('../config/db.config.php');

    $params = json_decode(file_get_contents('php://input'),true);
    
    // $added = $_POST['added'];
    // $deleted = $_POST['deleted'];
    // $edited = $_POST['edited'];
    // $worker = $_POST['worker'];
    // $consumer = $_POST['consumer'];
    // $planned_delivery_at = $_POST['planned_delivery_at'];
    // $order = $_POST['order'];

    $added = $params['added'];
    $deleted = $params['deleted'];
    $edited = $params['edited'];
    $worker = $params['worker'];
    $consumer = $params['consumer'];
    $planned_delivery_at = $params['planned_delivery_at'];
    $ordered_at = $params['ordered_at'];
    $order = $params['order'];
    $form = $params['form'];

	// file_put_contents('order_save.log', ' Added count '. count($added) . ' Deleted count '. count($deleted) . ' Edited count '. count($edited));

	$curdate = date("Y-m-d H:i:s");

    // Update order info or create new order
    if ($order == "new") {
		$query = "INSERT INTO orders (consumer, worker, ordered_at, planned_delivery_at, reported_at, form) ";
		$query .= " VALUES ($consumer, $worker, '$ordered_at', '$planned_delivery_at', NULL, $form); ";

		// echo $query;
		// file_put_contents('order_save.log', $query);
		$result = mysql_query($query) or die(mysql_error());
		$order = mysql_insert_id();
    } else {
		$query = "UPDATE orders SET consumer=$consumer, worker=$worker, ordered_at='$ordered_at', planned_delivery_at='$planned_delivery_at', reported_at=NULL, form=$form ";
		$query .= " WHERE id=$order; ";
		// echo $query;
		// file_put_contents('order_save.log', $query);
		$result = mysql_query($query) or die(mysql_error());
    }

    // Delete positions

    if (count($deleted) > 0) {
	    for ($i = 0 ; $i < count($deleted); $i++ ) {
			// save deleting record to the log
			$query = "SELECT * FROM positions WHERE id=$deleted[$i] ; ";
			$result = mysql_query($query) or die(mysql_error());
			$deleting_record = "";
			while ($row = mysql_fetch_assoc($result)) 
			{
				$deleting_record .= ' Order: ' .$row['order_id'];
				$deleting_record .= ' Commodity: ' .$row['commodity'];
				$deleting_record .= ' Price: ' .$row['price'];
				$deleting_record .= ' Quantity: ' .$row['quantity'];
			};			

			// delete record
			file_put_contents('deleted.log', $deleting_record, FILE_APPEND);
			$query = "DELETE FROM positions WHERE id=$deleted[$i] ; ";
			$result = mysql_query($query) or die(mysql_error());
	    }

	}    
    // Update positions

    if (count($edited) > 0) {

	    for ($i = 0 ; $i < count($edited); $i++ ) {
	    	$commodity = $edited[$i]['commodity'];
	    	$quantity = $edited[$i]['quantity'];
	    	$notes = $edited[$i]['notes'];
	    	$price = $edited[$i]['price'];
	    	$id = $edited[$i]['id'];

			$query = "UPDATE positions SET commodity=$commodity, order_id=$order, planned_delivery_at='$planned_delivery_at', quantity=$quantity, notes='$notes', price=$price ";
			$query .= " WHERE id=$id ;";
			// file_put_contents('order_save.log', $query, FILE_APPEND);

			$result = mysql_query($query) or die(mysql_error());
	    }

	}    
    // Insert positions

    if (count($added) > 0) {

	    for ($i = 0 ; $i < count($added); $i++ ) {
	    	$commodity = $added[$i]['commodity'];
	    	$quantity = $added[$i]['quantity'];
	    	$notes = $added[$i]['notes'];
	    	$price = $added[$i]['price'];

			$query = "INSERT INTO positions (commodity, order_id, planned_delivery_at, quantity, notes, price) VALUES ($commodity, $order, '$planned_delivery_at', $quantity, '$notes', $price); ";
			// file_put_contents('order_save.log', $query, FILE_APPEND);
			$result = mysql_query($query) or die(mysql_error());
	    }
	}    


?>