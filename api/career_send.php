<?php
declare(strict_types=1);
header('Content-Type: application/json');
require __DIR__ . '/mail_config.php';

$requestId = bin2hex(random_bytes(4));
mail_logger("$requestId --- CAREER request");

try {
  if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["ok"=>false,"message"=>"Method not allowed"]);
    exit;
  }

  $fullName = trim($_POST['fullName'] ?? '');
  $email = trim($_POST['email'] ?? '');
  $phone = trim($_POST['phone'] ?? '');
  $position = trim($_POST['position'] ?? '');
  $experience = trim($_POST['experience'] ?? '');
  $current_company = trim($_POST['current_company'] ?? '');
  $cover_letter = trim($_POST['cover_letter'] ?? '');
  $consent = isset($_POST['consent']);

  if ($fullName === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || $phone === '' || $position === '' || $experience === '' || !$consent) {
    http_response_code(400);
    echo json_encode(["ok"=>false,"message"=>"Please fill required fields and consent."]);
    exit;
  }

  $mail = new_mailer($requestId);

  $TO_EMAIL = 'career@harmoneywealth.com';
  $mail->addAddress($TO_EMAIL, 'Careers');
  $mail->addReplyTo($email, $fullName);

  $mail->isHTML(false);
  $mail->Subject = "Career Application: {$position} - {$fullName}";
  $mail->Body =
    "CAREER FORM\n".
    "Full Name: {$fullName}\n".
    "Email: {$email}\n".
    "Phone: {$phone}\n".
    "Position: {$position}\n".
    "Experience: {$experience}\n".
    "Current Company: {$current_company}\n\n".
    "Cover Letter:\n{$cover_letter}\n";

  // Resume attachment (pdf/doc/docx up to 5MB)
  if (!isset($_FILES['resume']) || $_FILES['resume']['error'] === UPLOAD_ERR_NO_FILE) {
    // If you made resume required in HTML, keep this required too:
    http_response_code(400);
    echo json_encode(["ok"=>false,"message"=>"Please upload your resume."]);
    exit;
  }

  $f = $_FILES['resume'];
  if ($f['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(["ok"=>false,"message"=>"Resume upload failed."]);
    exit;
  }

  $ext = strtolower(pathinfo($f['name'], PATHINFO_EXTENSION));
  $allowed = ['pdf', 'doc', 'docx'];
  if (!in_array($ext, $allowed, true) || (int)$f['size'] > 5 * 1024 * 1024) {
    http_response_code(400);
    echo json_encode(["ok"=>false,"message"=>"Resume must be PDF/DOC/DOCX and <= 5MB."]);
    exit;
  }

  $safeName = preg_replace('/[^a-zA-Z0-9._-]/', '_', $f['name']) ?: ("resume.".$ext);
  $mail->addAttachment($f['tmp_name'], $safeName);

  $mail->send();
  mail_logger("$requestId ✅ CAREER sent to $TO_EMAIL");
  echo json_encode(["ok"=>true,"message"=>" Application submitted successfully."]);

} catch (Throwable $e) {
  mail_logger("$requestId ❌ CAREER error: ".$e->getMessage());
  http_response_code(500);
  echo json_encode(["ok"=>false,"message"=>"❌ Failed to submit. Check logs/mail.log"]);
}
