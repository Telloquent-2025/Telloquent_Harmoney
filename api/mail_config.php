<?php
declare(strict_types=1);

date_default_timezone_set('Asia/Kolkata');

require __DIR__ . '/../PHPMailer/src/Exception.php';
require __DIR__ . '/../PHPMailer/src/PHPMailer.php';
require __DIR__ . '/../PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

function mail_logger(string $msg): void {
  $logDir = __DIR__ . '/../logs';
  if (!is_dir($logDir)) @mkdir($logDir, 0775, true);
  $logFile = $logDir . '/mail.log';
  file_put_contents($logFile, '['.date('Y-m-d H:i:s').'] '.$msg.PHP_EOL, FILE_APPEND);
}

function new_mailer(string $requestId): PHPMailer {
  $GMAIL_USER = 'gagana@telloquent.com';
  $GMAIL_APP_PASSWORD = 'xhnl jass plql mqbe'; // 16-char app password (spaces ok)

  // Where you want to receive the contact emails:


  $mail = new PHPMailer(true);
  $mail->isMail();
  $mail->Host = 'smtp.gmail.com';
  $mail->SMTPAuth = true;
  $mail->Username = $GMAIL_USER;
  $mail->Password = $GMAIL_APP_PASSWORD;
  $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
  $mail->Port = 587;
  $mail->CharSet = 'UTF-8';

  // Debug while testing (set 0 later)
  $mail->SMTPDebug = SMTP::DEBUG_SERVER;
  $mail->Debugoutput = function($str, $level) use ($requestId) {
    mail_logger("$requestId [SMTP-$level] $str");
  };

  $mail->setFrom($GMAIL_USER, 'Website');
  return $mail;
}
