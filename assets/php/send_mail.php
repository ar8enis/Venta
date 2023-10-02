<?php
	require '../PHPMailer/src/PHPMailer.php';
	require '../PHPMailer/src/SMTP.php';
	require '../PHPMailer/src/Exception.php';

	$mail =  new PHPMailer\PHPMailer\PHPMailer();

    if (isset($_POST)) {

        $customer_name = $_POST['name'];
        $customer_phone = $_POST['phone'];
        $customer_mail = $_POST['mail'];
        $customer_message = $_POST['message'];
        $customer_folio = $_POST['folio'];

        $filename = "COT000" . $customer_folio . ".pdf";
        $filepath = $_SERVER["DOCUMENT_ROOT"] . "/assets/pdf/" . $filename;

        try {
            //? CONFIGURACIONES DEL SERVIDOR
            $mail -> SMTPDebug = 2;
            $mail -> isSMTP();
            $mail -> Host = 'mail.refrigeracionyproyectossanantonio.com'; //? HOST SMTP
            $mail -> SMTPAuth = true;
            $mail -> Username = 'ventasrefrigeracion@refrigeracionyproyectossanantonio.com'; //? CORREO DEL SITIO
            $mail -> Password = '******'; //? CONTRASEÑA DEL CORREO
            $mail -> SMTPSecure = 'ssl'; //? SEGURIDAD SMTP
            $mail -> Port = 465; //? PUERTO SMTP
            $mail -> setFrom('ventasrefrigeracion@refrigeracionyproyectossanantonio.com', "COT000" . $customer_folio); //? DE
            $mail -> addAddress('ventasrefrigeracion@refrigeracionyproyectossanantonio.com', $customer_name); //? PARA
            $mail -> isHTML(true);
            $mail -> Subject = "Cotización - Refrigeración y Proyectos San Antonio";
            $mail -> addAttachment($filepath, $filename);
            $mail -> Body = $customer_message;
            $mail -> CharSet = 'UTF-8';
            $mail -> send();
    
            echo 'Message has been sent';
    
        } catch (Exception $e) {
    
            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    
        }

    }

?>