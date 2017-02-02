<?
	require ('../config/db.config.php');

    $params = json_decode(file_get_contents('php://input'),true);
    
    $added = $params['added'];
    $deleted = $params['deleted'];
    $worker = $params['worker'];
    $report = $params['report'];
    $visited_at = $params['visited_at'];
    // $visited_at = substr($visited_at, 0,10);

	// file_put_contents('order_save.log', ' Added count '. count($added) . ' Deleted count '. count($deleted) . ' Edited count '. count($edited));

	$curdate = date("Y-m-d H:i:s");

    // Update order info or create new order
    if ($report == "new") {
		$query = "INSERT INTO visit_reports (worker, visited_at, reported_at) ";
		$query .= " VALUES ($worker, '$visited_at', NULL); ";

		// echo $query;
		file_put_contents('visit_report_save.log', $query);
		$result = mysql_query($query) or die(mysql_error());
		$report = mysql_insert_id();
    } else {
		$query = "UPDATE visit_reports SET worker=$worker, visited_at='$visited_at', reported_at=NULL ";
		$query .= " WHERE id=$report; ";
		// echo $query;
		file_put_contents('visit_report_save.log', $query);
		$result = mysql_query($query) or die(mysql_error());
    }

    // echo $report;

    // Delete positions

    if (count($deleted) > 0) {
	    for ($i = 0 ; $i < count($deleted); $i++ ) {
			// save deleting record to the log
			// $query = "SELECT * FROM visits WHERE id=$deleted[$i] ; ";
			// $result = mysql_query($query) or die(mysql_error());
			// $deleting_record = "";
			// while ($row = mysql_fetch_assoc($result)) 
			// {
			// 	$deleting_record .= ' Order: ' .$row['order_id'];
			// 	$deleting_record .= ' Commodity: ' .$row['commodity'];
			// 	$deleting_record .= ' Price: ' .$row['price'];
			// 	$deleting_record .= ' Quantity: ' .$row['quantity'];
			// };			
			// file_put_contents('deleted.log', $deleting_record, FILE_APPEND);

			// delete record
			$query = "DELETE FROM visits WHERE id=$deleted[$i] ; ";
			file_put_contents('visit_report_save.log', $query, FILE_APPEND);
			$result = mysql_query($query) or die(mysql_error());
	    }

	}    

    // Insert positions

    if (count($added) > 0) {

	    for ($i = 0 ; $i < count($added); $i++ ) {
	    	$consumer = $added[$i]['consumer'];

			$query = "INSERT INTO visits (consumer, report) VALUES ($consumer, $report); ";
			file_put_contents('visit_report_save.log', $query, FILE_APPEND);
			$result = mysql_query($query) or die(mysql_error());
	    }
	}    


?>