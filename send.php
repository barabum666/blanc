<?php
$fio = $_POST['name'];
$tel = $_POST['tel'];
$fio = htmlspecialchars($name);
$tel = htmlspecialchars($tel);
$fio = urldecode($name);
$tel = urldecode($tel);
$fio = trim($name);
$tel = trim($tel);

$mail = "srunia@rambler.ru";

if (mail($mail, "Заявка с сайта", "Имя:".$fio.". Телефон: ".$tel ,"From: example2@mail.ru \r\n"))
 {     echo "сообщение успешно отправлено";
} else {
    echo "при отправке сообщения возникли ошибки";
}?>
