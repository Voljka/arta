<?php
header('Content-Type: text/html; charset=utf8');	
require_once ('../libs/PHPMailer/PHPMailerAutoload.php');

function sendPriceMessage($contact) {

	$subject = 'Компания Арта. Актуальный прайс';
	$message = 'Добрый день!<br>';
	$message .= 'В связи с изменением ассортимента и ценового предложения предлагаем Вам ознакомиться с актуальным прайс-листом компании Арта. <br>';
	$message .= 'http://arta-price.i-desk.xyz <br>';

	$message .= 'По всем возникающим вопросам Вы можете обратиться ко мне по указанным ниже реквизитам<br>';
	$message .= 'Будем рады нашему взаимовыгодному сотрудничеству!<br><br>';
	$message .= 'С уважением, <br>представитель Компании Арта<br>Назарьева Ольга<br>тел. 095-808-09-08<br>e-mail: nazarevao1703@gmail.com';

	echo $message;

	$email = new PHPMailer();

	$email->CharSet = "UTF-8";

	$email->AddReplyTo('nazarevao1703@gmail.com', 'Nazarieva Olga');
	$email->SetFrom('nazareva.olga.arta@i-desk.xyz', 'Nazarieva Olga');
	// $email->AddAddress( $email );
	$email->AddAddress( 'nazarevao1703@gmail.com' );
	$email->AddAddress( $contact );

	// $email->addAttachment('/home/idesk/i-desk.xyz/arta-lugansk/php/reports/route_report.xls');
	$email->isHTML(true);                                  // Set email format to HTML

	$email->Subject = $subject;
	$email->Body    = $message;

	return $email->Send();
}

$params = json_decode(file_get_contents('php://input'),true);
$consumer = $params['id'];

require ('../config/db.config.php');

$query = "SELECT mail FROM consumers ";

if ($consumer) {
	$query .= " WHERE id=$consumer ";	
}

$result = mysql_query($query) or die(mysql_error());

$emails = array();
while ($row = mysql_fetch_assoc($result)) 
{
	$email_array = explode(',', str_replace(" ", "", $row['mail']));
	
	foreach ($email_array as $email) {
		if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
		    echo "E-mail : ($email).\n";
		    sendPriceMessage($email);
		} else {
		    // echo "E-mail ($email) указан неверно.\n";
		}
	}

}

// echo 'Consumer id # ' . $params['id'];
// echo sendPriceMessage('voljka13@gmail.com');

echo 'Finished';
?>