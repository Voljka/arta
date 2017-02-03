<?php
header('Content-Type: text/html; charset=utf8');	
require_once ('../libs/PHPMailer/PHPMailerAutoload.php');

function sendPriceMessage($subject, $message, $contact) {

	$email = new PHPMailer();

	$email->CharSet = "UTF-8";

	$email->AddReplyTo('nazarevao1703@gmail.com', 'Nazarieva Olga');
	$email->SetFrom('nazareva.olga.arta@i-desk.xyz', 'Nazarieva Olga');
	// $email->AddAddress( $email );
	//$email->AddAddress( 'nazarevao1703@gmail.com' );
	$email->AddAddress( $contact );

	// $email->addAttachment('/home/idesk/i-desk.xyz/arta-lugansk/php/reports/route_report.xls');
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


$params = json_decode(file_get_contents('php://input'),true);
$consumer = $params['id'];

require ('../config/db.config.php');

$query = "SELECT name, mail FROM consumers ";

if ($consumer) {
	$query .= " WHERE id=$consumer ";	
}

$result = mysql_query($query) or die(mysql_error());

$emails = array();

$subject1 = 'Компания Арта. Актуальный прайс';
$message1 = 'Добрый день!<br>';
$message1 .= 'В связи с изменением ассортимента предлагаем Вам ознакомиться с актуальным прайс-листом компании Арта. <br>';
$message1 .= 'http://arta-price.i-desk.xyz <br>';

$message1 .= 'По всем возникающим вопросам Вы можете обратиться по указанным ниже реквизитам<br>';
$message1 .= 'Будем рады взаимовыгодному сотрудничеству!<br><br>';
$message1 .= 'С уважением, <br>представитель Компании Арта<br>Назарьева Ольга<br>тел. 095-808-09-08<br>e-mail: nazarevao1703@gmail.com';

$message2 = "Прайс был успешно отправлен следующим клиентам: <br>";

while ($row = mysql_fetch_assoc($result)) 
{
	$email_array = explode(',', str_replace(" ", "", $row['mail']));
	
	foreach ($email_array as $email) {
		if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
		    echo "E-mail : ($email).\n";
		    $message2 .= 'Название клиента: <b>' . unsafe($row['name']) . '</b>. Email: <b>' . $row['mail'] . '</b>';

		    sendPriceMessage($subject1, $message1, $email);
		} else {
		    // echo "E-mail ($email) указан неверно.\n";
		}
	}

}

$subject2 = 'Отчет об отправке прайсов';
sendPriceMessage($subject2, $message2, 'nazarevao1703@gmail.com');

// echo 'Consumer id # ' . $params['id'];
// echo sendPriceMessage('voljka13@gmail.com');

echo 'Finished';
?>