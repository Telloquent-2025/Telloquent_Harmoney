<?php declare(strict_types=1);
header('Content-Type: application/json');
require __DIR__ . '/mail_config.php';

$requestId = bin2hex(random_bytes(4));
mail_logger("$requestId --- CONTACT request");

try {
  if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["ok"=>false,"message"=>"Method not allowed"]);
    exit;
  }

  $name = trim($_POST['name'] ?? '');
  $email = trim($_POST['email'] ?? '');
  $phone = trim($_POST['phone'] ?? '');
  $subject = trim($_POST['subject'] ?? '');
  $message = trim($_POST['message'] ?? '');

  if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || $subject === '' || $message === '') {
    http_response_code(400);
    echo json_encode(["ok"=>false,"message"=>"Please fill required fields."]);
    exit;
  }

  $mail = new_mailer($requestId);

  $TO_EMAIL = 'support@harmoneywealth.com';
  $mail->addAddress($TO_EMAIL, 'Support');
  $mail->addReplyTo($email, $name);

  $mail->isHTML(false);
 $mail->Subject = "New contact enquiry from website";
  $mail->Body =
    "CONTACT FORM\n".
    "Name: {$name}\n".
    "Email: {$email}\n".
    "Phone: {$phone}\n".
    "Subject: {$subject}\n\n".
    "Message:\n{$message}\n";

  // Optional PDF attachment
  if (isset($_FILES['attachment']) && $_FILES['attachment']['error'] !== UPLOAD_ERR_NO_FILE) {
    $f = $_FILES['attachment'];
    if ($f['error'] === UPLOAD_ERR_OK) {
      $ext = strtolower(pathinfo($f['name'], PATHINFO_EXTENSION));
      $sizeOk = ((int)$f['size'] <= 5 * 1024 * 1024);
      if ($ext === 'pdf' && $sizeOk) {
        $safeName = preg_replace('/[^a-zA-Z0-9._-]/', '_', $f['name']) ?: 'attachment.pdf';
        $mail->addAttachment($f['tmp_name'], $safeName);
      }
    }
  }

  $mail->send();
  mail_logger("$requestId ✅ CONTACT sent to $TO_EMAIL");
  echo json_encode(["ok"=>true,"message"=>"✅ Message sent successfully."]);

} catch (Throwable $e) {
  mail_logger("$requestId ❌ CONTACT error: ".$e->getMessage());
  http_response_code(500);
  echo json_encode(["ok"=>false,"message"=>"❌ Failed to send. Check logs/mail.log"]);
}
