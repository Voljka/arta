<?php

header('Content-Type: text/html; charset=utf8');	
require_once ('../libs/phpexcel/Classes/PHPExcel/IOFactory.php');
require_once ('../libs/PHPMailer/PHPMailerAutoload.php');

function sendReport($subject, $message, $file) {

	$to  = "Admin <voljka13@gmail.com>" ; 


    $content = file_get_contents($file);
    $content = chunk_split(base64_encode($content));

	$reply = "Reply<lva1331@mail.ru>";

	$email = new PHPMailer();

	$email->CharSet = "UTF-8";

	$email->setFrom('nazareva.olga.arta@i-desk.xyz', 'Nazarieva Olga');
	$email->addAddress( 'voljka13@gmail.com' );

	$email->addAttachment('/home/idesk/i-desk.xyz/arta-lugansk/php/reports/route_report.xls');
	$email->isHTML(true);                                  // Set email format to HTML

	$email->Subject = $subject;
	$email->Body    = $message;

	return $email->Send();
}

function unsafe($str) {
	$str = str_replace('&#39;', '\'', $str);
	$str = str_replace('&#34;', '\"', $str);
	return $str;
}

function date_formatted($date) {
	return substr($date, 8, 2). '-'. substr($date, 5,2) . '-' . substr($date, 0, 4);
}

$start_date = $_GET['start_date'];
$manager_id = $_GET['manager'];

$filepath = 'templates/route.xlsx';

$objReader = PHPExcel_IOFactory::createReaderForFile($filepath);
$objPHPExcel = $objReader->load($filepath);

// Get orders from DB

require ('../config/db.config.php');

$table = "visits";

for ($j = 0; $j < 5; $j++) {

	$nextdate = date("Y-m-d", strtotime($start_date) + $j*24*60*60);

	$query = "SELECT $table.*, workers.lastname manager_name, consumers.name consumer_name, consumers.place, consumers.representatives, consumers.notes consumer_notes, regions.name region_name, visit_reports.visited_at  FROM $table ";
	$query .= 	" LEFT JOIN visit_reports ON visit_reports.id = $table.report ";
	$query .= 	" LEFT JOIN consumers ON consumers.id = $table.consumer";
	$query .= 	" LEFT JOIN regions ON consumers.region = regions.id";
	$query .= 	" LEFT JOIN workers ON workers.id = visit_reports.worker ";

	$query .= "WHERE visit_reports.worker = $manager_id AND visit_reports.visited_at = '$nextdate' ";	
	$query .= "ORDER BY workers.lastname ";

	$result = mysql_query($query) or die(mysql_error());

	$visits = array();
	while ($row = mysql_fetch_assoc($result)) 
	{
		$visits[] = $row;
	};

	$table_body_start_line = 6;

	// Make XLS file
	$objPHPExcel->setActiveSheetIndex($j);

	$ews = $objPHPExcel->setActiveSheetIndex($j);
	// Order Header
	$ews->setCellValue('D1', $visits[0]['manager_name']);
	$ews->setCellValue('D3', date_formatted( $visits[0]['visited_at'] ));

	$visited_regions = array();

	// Order Body

	for ($i = 0; $i < count($visits); $i++) {
		$ews->setCellValue('A' . ($i+$table_body_start_line), $i+1);
		$ews->setCellValue('B' . ($i+$table_body_start_line), 'Type');
		$ews->setCellValue('C' . ($i+$table_body_start_line), unsafe($visits[$i]['consumer_name']));
		$ews->setCellValue('D' . ($i+$table_body_start_line), 'Representative');
		$ews->setCellValue('E' . ($i+$table_body_start_line), $visits[$i]['representatives']);
		$ews->setCellValue('F' . ($i+$table_body_start_line), $visits[$i]['place']);
		$ews->setCellValue('G' . ($i+$table_body_start_line), $visits[$i]['notes']);

		$regionAlreadyAdded = false;
		for ($k = 0; $k < count($visited_regions); $k++) {
			if ($visited_regions[$k] == $visits[$i]['region_name']) {
				$regionAlreadyAdded = true;
			}
		}

		if (! $regionAlreadyAdded) {
			$visited_regions[] = $visits[$i]['region_name'];
		}
	}

	// Write visited regions
	$region_list = "";
	for ($k = 0; $k < count($visited_regions); $k++) {
		$region_list .= $visited_regions[$k];
		if ($k != count($visited_regions)-1) {
			$region_list .= ', ';
		}
	}

	$ews->setCellValue('D2', $region_list);

	// Total Rows

	$table_body = 'A' . $table_body_start_line .':G'. ($i + $table_body_start_line - 1);

	$style_borders_all_thin = array(
	      'borders' => array(
	          'allborders' => array(
	              'style' => PHPExcel_Style_Border::BORDER_THIN
	          )
	      )
	    );

	$style_borders_outline_medium = array(
	  'borders' => array(
	    'outline' => array(
	      'style' => PHPExcel_Style_Border::BORDER_MEDIUM
	    )
	  )
	);

	// table body borders
	$ews->getStyle($table_body)->applyFromArray($style_borders_all_thin);
	$ews->getStyle($table_body)->applyFromArray($style_borders_outline_medium);
}


$fileType = "Excel5";
$orderFileName = "route_report.xls";

$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, $fileType);
$objWriter->save($orderFileName);

// ob_get_clean();

$objPHPExcel->disconnectWorksheets();
unset($objWriter, $objPHPExcel);

echo 'Finished';

$report_subject = 'Отчет маршрутизации. ' . unsafe($visits[0]['manager_name']) . '. Период: ' . date_formatted($start_date) . ' - ' . date_formatted($nextdate);
$report_message = 'Добрый день!<br>Отчет маршрутизации<br>Торговый представитель: ' . unsafe($visits[0]['manager_name']) . '.<br>Период : ' . date_formatted( $start_date ). ' - ' . date_formatted( $nextdate);

sendReport( $report_subject, $report_message, $orderFileName);

?>