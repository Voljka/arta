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
	$email->addAddress( 'voljka13@gmail.com' );
	$email->addAddress( 'nazarevao1703@gmail.com' );

	if (! $self) {
		$email->addAddress( 'voljka@inbox.ru' );
		//$email->addAddress( 'sale@lugashop.net' );
	}

	$email->addAttachment('/home/idesk/i-desk.xyz/arta-lugansk/php/reports/order.xls');
	$email->isHTML(true);                                  // Set email format to HTML

	$email->Subject = $subject;
	$email->Body    = $message;

	return $email->Send();
}

function unsafe($str) {
	$str = str_replace('&#39;', '\'', $str);
	$str = str_replace('&#34;', '"', $str);
	return $str;
}

function date_formatted($date) {
	return substr($date, 8, 2). '-'. substr($date, 5,2) . '-' . substr($date, 0, 4);
}

$order_id = $_GET['order'];
$self_mailing = $_GET['mailing'];

$filepath = 'templates/order.xls';

$objReader = PHPExcel_IOFactory::createReaderForFile($filepath);
$objPHPExcel = $objReader->load($filepath);

// Get positions from DB

require ('../config/db.config.php');

$table = "positions";

$query = "SELECT $table.commodity, $table.quantity, $table.price, $table.notes position_note, orders.consumer, orders.worker, orders.planned_delivery_at, orders.self_delivery, orders.form, orders.ordered_at, consumers.name consumer_name, consumers.place, consumers.representatives, consumers.notes consumer_note, consumers.is_vip, commodities.name commodity_name, commodities.price1, commodities.price2, commodities.price3, workers.lastname FROM $table ";
$query .= " LEFT JOIN orders ON $table.order_id = orders.id ";
$query .= " LEFT JOIN consumers ON orders.consumer = consumers.id ";
$query .= " LEFT JOIN commodities ON $table.commodity = commodities.id ";
$query .= " LEFT JOIN workers ON orders.worker = workers.id ";

if ($order_id) {
	$query .= " WHERE $table.order_id=$order_id;";
}

// echo $query;

$result = mysql_query($query) or die(mysql_error());

$positions = array();
while ($row = mysql_fetch_assoc($result)) 
{
	$positions[] = $row;
};

$table_body_start_line = 12;

// Make XLS file
$objPHPExcel->setActiveSheetIndex(0);

$ews = $objPHPExcel->setActiveSheetIndex(0);
// Order Header
$ews->setCellValue('C2', $positions[0]['lastname']);

$ews->setCellValue('C4', unsafe($positions[0]['consumer_name']));
$ews->setCellValue('C5', unsafe($positions[0]['place']));
$ews->setCellValue('C6', unsafe($positions[0]['representatives']));
// $ews->setCellValue('C7', unsafe($positions[0]['consumer_note']));

$ews->setCellValue('C9', date_formatted($positions[0]['planned_delivery_at']));
$ews->setCellValue('F9', $positions[0]['form']);

// Order Body
$total = 0;
$total1 = 0;
$total2 = 0;
$total3 = 0;

for ($i = 0; $i < count($positions); $i++) {
	$ews->setCellValue('A' . ($i+$table_body_start_line), $i+1);
	$ews->setCellValue('B' . ($i+$table_body_start_line), $positions[$i]['commodity_name']);
	$ews->setCellValue('C' . ($i+$table_body_start_line), $positions[$i]['quantity']);
	$ews->setCellValue('D' . ($i+$table_body_start_line), $positions[$i]['price']);
	$ews->setCellValue('E' . ($i+$table_body_start_line), $positions[$i]['price'] * $positions[$i]['quantity']);
	$ews->setCellValue('F' . ($i+$table_body_start_line), $positions[$i]['position_note']);
	$total += $positions[$i]['price'] * $positions[$i]['quantity'];
	$total1 += $positions[$i]['price1'] * $positions[$i]['quantity'];
	$total2 += $positions[$i]['price2'] * $positions[$i]['quantity'];
	$total3 += $positions[$i]['price3'] * $positions[$i]['quantity'];

}

// Total Rows

$ews->setCellValue('A' . ($i+$table_body_start_line+1), 'ИТОГО');
$ews->setCellValue('E' . ($i+$table_body_start_line+1), $total);

if ($positions[0]['is_vip'] == "1") {
	$ews->setCellValue('B' . ($i+$table_body_start_line+3), '* VIP. Цена посчитана по колонке \'свыше 50 000 рублей\'');	
} else {
	if ($positions[0]['self_delivery'] == '1') {
		$ews->setCellValue('B' . ($i+$table_body_start_line+3), '* САМОВЫВОЗ!!! ');	
		$ews->setCellValue('B9', 'Дата самовывоза : ');
	} else {
		if ($total == $total1) {
			$ews->setCellValue('B' . ($i+$table_body_start_line+3), '* Цена посчитана по колонке \'свыше 50 000 рублей\'');	
		} else {
			if ($total == $total2 && (($total2 == $total3 && $total>9999.99) || $total2 !=$total3)) {
				$ews->setCellValue('B' . ($i+$table_body_start_line+3), '* Цена посчитана по колонке \'свыше 10 000 рублей\'');	
			} else {
				// $ews->setCellValue('B' . ($i+$table_body_start_line+3), 'Цена посчитана по колонке \'менее 10 000 рублей\'');	
			}
		}
	}
}

$price_type_row = 'B' . ($i+$table_body_start_line+3). ':' . 'F' . ($i+$table_body_start_line+3);

$table_body = 'A' . $table_body_start_line .':F'. ($i + $table_body_start_line - 1);
$table_total = 'A' . ($i + $table_body_start_line + 1) . ':E' . ($i + $table_body_start_line + 1);
$total_row_merge = 'A' . ($i+$table_body_start_line + 1) . ':D' . ($i+$table_body_start_line+1);
$notes_column = 'F' . $table_body_start_line . ':F' . ($i+$table_body_start_line-1);
$commodities_column = 'B' . $table_body_start_line . ':B' . ($i+$table_body_start_line-1);

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

// notes column
$ews->getStyle($notes_column)->getFont()->getColor()->setRGB('FF0000');

// price type row

$ews->mergeCells($price_type_row);
$ews->getStyle($price_type_row)->getFont()->getColor()->setRGB('FF0000');

// Write the file

$fileType = "Excel5";
$orderFileName = "order.xls";

$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, $fileType);
$objWriter->save($orderFileName);

// ob_get_clean();

$objPHPExcel->disconnectWorksheets();
unset($objWriter, $objPHPExcel);

echo 'mailing = ' . $self_mailing;
echo 'Finished';

$report_subject = 'Заказ. ' . unsafe($positions[0]['consumer_name']) . '. Доставка: ' . date_formatted($positions[0]['planned_delivery_at']);
$report_message = 'Добрый день!<br>Заказ<br>Заказчик: ' . unsafe($positions[0]['consumer_name']) . '.<br>Дата поставки: ' . date_formatted($positions[0]['planned_delivery_at']);

// $report_subject = 'Заказ. ' . html_entity_decode($positions[0]['consumer_name']) . '. Доставка: ' . date_formatted($positions[0]['planned_delivery_at']);
// $report_message = 'Добрый день!<br>Заказ<br>Заказчик: ' . html_entity_decode($positions[0]['consumer_name']) . '.<br>Дата поставки: ' . date_formatted($positions[0]['planned_delivery_at']);

sendReport( $report_subject, $report_message, $orderFileName, (intval($self_mailing) == 1 ? true : false));

?>