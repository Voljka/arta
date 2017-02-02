<?
	
	require ('../config/db.config.php');

    $params = json_decode(file_get_contents('php://input'), true);
    
    $id = $params['id'];

	$query = "DELETE FROM visit_reports WHERE id=$id ";
	echo $query;
	$result = mysql_query($query) or die(mysql_error());

	$query = "DELETE FROM visits WHERE report=$id ";
	echo $query;
	$result = mysql_query($query) or die(mysql_error());
	
	echo 'Finished';

?>