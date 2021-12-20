<?php   
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'path/to/PHPMailer/src/Exception.php';
    require 'path/to/PHPMailer/src/PHPMailer.php';
    require 'path/to/PHPMailer/src/SMTP.php';

    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->setLanguage('ru', 'phpmailer/language/');
    $mail->IsHTML(true);

    //от кого письмо
    $mail->setForm('nikitamarch702@gmail.com', 'Никита');
    //кому отправить
    $mail->addAddress('vkomlyk94@gmail.com');
    //тема письма
    $mail->Subject = 'Регистрация'

    //тело письма 

    $body='<h3>Письмо</h3>'

    if(trim(!empty($_POST['name']))){
        $body.='<p>Имя:'.$_POST['name'].'</p>';
    }
    if(trim(!empty($_POST['email']))){
        $body.='<p>E-mail:'.$_POST['email'].'</p>';
    }
    if(trim(!empty($_POST['phone']))){
        $body.='<p>Телефон:'.$_POST['phone'].'</p>';
    }

    $mail->Body = $body;

    //отправка 
    if (!$mail->send()){
        $message = 'Ошибка';
    }else{
        $message = 'Данные отправлены';
    }
    $response = ['message'=> $message];

    header('Content-type: application/json');
    echo json_encode($response);
?>