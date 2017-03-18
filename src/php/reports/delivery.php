<?php

header('Content-Type: text/html; charset=utf8');	
require_once ('../libs/phpexcel/Classes/PHPExcel/IOFactory.php');
require_once ('../libs/PHPMailer/PHPMailerAutoload.php');

function sendReport($subject, $message, $file, $self) {

	$to  = "Admin <voljka13@gmail.com>" ; 


    $content = file_get_contents($file);
    $content = chunk_split(base64_encode($content));

	$reply = "Reply<lva1331@mail.ru>";

	$email = new PHPMailer();

	$email->CharSet = "UTF-8";

	$email->AddReplyTo('nazarevao1703@gmail.com', 'Nazarieva Olga');
	$email->setFrom('nazareva.olga.arta@i-desk.xyz', 'Nazarieva Olga');
	// $email->addAddress( 'voljka13@gmail.com' );
	$email->addAddress( 'nazarevao1703@gmail.com' );

	if (! $self) {
		$email->addAddress( 'deroored80@mail.ru' );
	}

	$email->addAttachment('/home/idesk/i-desk.xyz/arta-lugansk/php/reports/delivery_report.xls');
	$email->isHTML(true);                                  // Set email format to HTML

	$email->Subject = $subject;
	$email->Body    = $message;

	return $email->Send();
}

function unsafe($str) {
	$str = str_replace('&#39;', '\'', $str);
	$str = str_replace('&#34;', '"', $str);
	$str = str_replace('&amp;', '&', $str);
	return $str;
}


function date_formatted($date) {
	return substr($date, 8, 2). '-'. substr($date, 5,2) . '-' . substr($date, 0, 4);
}


$filepath = 'templates/deliveries.xlsx';

$objReader = PHPExcel_IOFactory::createReaderForFile($filepath);
$objPHPExcel = $objReader->load($filepath);

// Get orders from DB
$self_mailing = $_GET['mailing'];
require ('../config/db.config.php');

$table = "orders";

// $curdate = date("Y-m-d"). " 00:00:00";
$curdate = date("Y-m-d");

// $delivery_date = date("Y-m-d", strtotime($curdate) + 24*60*60) . " 00:00:00";
$delivery_date = date("Y-m-d", strtotime($curdate) + 24*60*60);

$query = "SELECT $table.*, workers.lastname manager_name, consumers.name consumer_name, consumers.place, details.order_sum, details.position_reported_at FROM $table ";
$query .= " LEFT JOIN workers ON workers.id = $table.worker";
$query .= " LEFT JOIN consumers ON consumers.id = $table.consumer";
$query .= " LEFT JOIN (";

$query .= 	"SELECT order_id, SUM(price*quantity) order_sum, SUM(deliveries.reported_at) position_reported_at FROM positions ";
$query .= 		" LEFT JOIN deliveries ON deliveries.position = positions.id ";
$query .= " GROUP BY order_id ";

$query .=       ") AS details ON details.order_id = $table.id ";
$query .=       "WHERE details.order_sum > 0 AND SUBSTRING($table.planned_delivery_at,1,10) = '$delivery_date' AND $table.self_delivery = 0 AND $table.reported_at IS NOT NULL ";	
// $query .=       "WHERE details.order_sum > 0 AND $table.planned_delivery_at = '$delivery_date' AND $table.self_delivery = 0 AND $table.reported_at IS NOT NULL ";	
$query .=       "ORDER BY orders.planned_delivery_at";

// echo $query;

$result = mysql_query($query) or die(mysql_error());

$orders = array();
while ($row = mysql_fetch_assoc($result)) 
{
	$orders[] = $row;
};

$table_body_start_line = 5;

// Make XLS file
$objPHPExcel->setActiveSheetIndex(0);

$ews = $objPHPExcel->setActiveSheetIndex(0);
// Order Header
$ews->setCellValue('C1', $orders[0]['manager_name']);
$ews->setCellValue('C2', date_formatted( substr($delivery_date, 0, 10) ));

// Order Body

$update_delivery_report_query = "INSERT INTO deliveries (position, delivered_at, notes, reported_at) VALUES ";
$Curdatetime = date("Y-m-d H:i:s");
$deliveries_to_add = 0;

for ($i = 0; $i < count($orders); $i++) {
	$ews->setCellValue('A' . ($i+$table_body_start_line), $i+1);
	$ews->setCellValue('B' . ($i+$table_body_start_line), unsafe($orders[$i]['consumer_name']));
	$ews->setCellValue('C' . ($i+$table_body_start_line), $orders[$i]['place']);
	$ews->setCellValue('D' . ($i+$table_body_start_line), $orders[$i]['order_sum']);
	$ews->setCellValue('E' . ($i+$table_body_start_line), date_formatted( $orders[$i]['ordered_at'] ));
	$ews->setCellValue('F' . ($i+$table_body_start_line), date_formatted( $orders[$i]['planned_delivery_at']) );

	$total += $orders[$i]['order_sum'];
	$cur_order = $orders[$i]['id'];
	$query = "SELECT * FROM positions WHERE order_id=$cur_order";
	// echo $query;

	$result = mysql_query($query) or die(mysql_error());

	while ($row = mysql_fetch_assoc($result)) 
	{
		$cur_position = $row['id'];	
		$update_delivery_report_query .= "($cur_position, NULL, '', '$Curdatetime'),";
		$deliveries_to_add++;
	};

}

if ($deliveries_to_add > 0) {
	$update_delivery_report_query = substr($update_delivery_report_query, 0, mb_strlen($update_delivery_report_query)-1);
	// echo $update_delivery_report_query;
	$result = mysql_query($update_delivery_report_query) or die(mysql_error());
}

// Total Rows

$ews->setCellValue('A' . ($i+$table_body_start_line+1), 'ИТОГО');
$ews->setCellValue('D' . ($i+$table_body_start_line+1), $total);

$table_body = 'A' . $table_body_start_line .':F'. ($i + $table_body_start_line - 1);
$table_total = 'A' . ($i + $table_body_start_line + 1) . ':D' . ($i + $table_body_start_line + 1);

$total_row_merge = 'A' . ($i+$table_body_start_line + 1) . ':C' . ($i+$table_body_start_line+1);
// $consumers_column = 'B' . $table_body_start_line . ':B' . ($i+$table_body_start_line-1);

$style_borders_all_thin = array(
      'borders' => array(
          'allborders' => array(
              'style' => PHPExcel_Style_Border::BORDER_THIN
          )
      )
    );

$style_total_row = array(
    'font' => array('bold' => true,),
    // 'alignment' => array('horizontal' => \PHPExcel_Style_Alignment::HORIZONTAL_LEFT,),
    );

$style_borders_outline_medium = array(
  'borders' => array(
    'outline' => array(
      'style' => PHPExcel_Style_Border::BORDER_MEDIUM
    )
  )
);

$style_total_row_merge = array(
    // 'font' => array('bold' => true,),
    'alignment' => array('horizontal' => \PHPExcel_Style_Alignment::HORIZONTAL_CENTER,),
    );

// table body borders
$ews->getStyle($table_body)->applyFromArray($style_borders_all_thin);
$ews->getStyle($table_body)->applyFromArray($style_borders_outline_medium);

// table total borders
$ews->getStyle($table_total)->applyFromArray($style_borders_all_thin);
$ews->getStyle($table_total)->applyFromArray($style_borders_outline_medium);

$ews->getStyle($table_total)->applyFromArray($style_total_row);

$ews->mergeCells($total_row_merge);
$ews->getStyle($total_row_merge)->applyFromArray($style_total_row_merge);

// consumers column
// $ews->getStyle($consumers_column)->getFont()->getColor()->setRGB('FF0000');

// Write the file

$fileType = "Excel5";
$orderFileName = "delivery_report.xls";

$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, $fileType);
$objWriter->save($orderFileName);

// ob_get_clean();

$objPHPExcel->disconnectWorksheets();
unset($objWriter, $objPHPExcel);

echo 'mailing = ' . $self_mailing;
echo 'Finished';

$report_subject = 'Отчет об отгрузках. ' . unsafe($orders[0]['manager_name']) . '. Доставка: ' . date_formatted( substr($delivery_date, 0, 10) );
$report_message = 'Добрый день!<br>Отчет об огрузке<br>Торговый представитель: ' . unsafe($orders[0]['manager_name']) . '.<br>Дата поставки: ' . date_formatted( substr($delivery_date, 0, 10) );

sendReport( $report_subject, $report_message, $orderFileName, (intval($self_mailing) == 1 ? true : false));

?>