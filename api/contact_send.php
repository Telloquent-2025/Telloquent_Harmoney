<?php
declare(strict_types=1);
header('Content-Type: application/json');

require __DIR__ . '/mail_config_support.php';

try {
    /* ================= METHOD CHECK ================= */
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        throw new Exception('Method not allowed');
    }

    /* ================= COLLECT INPUTS ================= */
    $name    = trim($_POST['name'] ?? '');
    $email   = trim($_POST['email'] ?? '');
    $phone   = trim($_POST['phone'] ?? '');
    $subject = trim($_POST['subject'] ?? '');
    $message = trim($_POST['message'] ?? '');

    /* ================= VALIDATION ================= */
    if (
        $name === '' ||
        !filter_var($email, FILTER_VALIDATE_EMAIL) ||
        $message === ''
    ) {
        http_response_code(400);
        throw new Exception('Invalid input');
    }

    /* ================= ESCAPE FOR HTML ================= */
    $nameEsc    = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
    $emailEsc   = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
    $phoneEsc   = htmlspecialchars($phone ?: '—', ENT_QUOTES, 'UTF-8');
    $subjectEsc = htmlspecialchars($subject ?: '—', ENT_QUOTES, 'UTF-8');
    $messageEsc = nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8'));

    /* ================= HTML EMAIL BODY ================= */
    $body = "
    <div style='font-family: Arial, sans-serif; color:#333; max-width:600px;'>
        <h2 style='color:#0b5ed7;'>Contact Form Submission</h2>

        <table cellpadding='8' cellspacing='0' style='border-collapse: collapse; width:100%;'>
            <tr>
                <td width='140'><strong>Full Name</strong></td>
                <td>{$nameEsc}</td>
            </tr>
            <tr>
                <td><strong>Email</strong></td>
                <td>{$emailEsc}</td>
            </tr>
            <tr>
                <td><strong>Phone</strong></td>
                <td>{$phoneEsc}</td>
            </tr>
            <tr>
                <td><strong>Form Subject</strong></td>
                <td>{$subjectEsc}</td>
            </tr>
        </table>

        <hr style='margin:20px 0;'>

        <p><strong>Message:</strong></p>
        <div style='background:#f8f9fa; padding:12px; border-left:4px solid #0b5ed7;'>
            {$messageEsc}
        </div>

        <p style='font-size:12px; color:#777; margin-top:20px;'>
            Sent from Harmoney FinServ Website – Contact Us page
        </p>
    </div>
    ";

    /* ================= SEND MAIL ================= */
    zoho_send_mail(
        'support@harmoneywealth.com',        // MUST be Zoho mailbox
        'support@harmoneywealth.com',           // Receiver
        'Contact from Website – Contact Us',    // Fixed subject (best practice)
        $body
    );

    echo json_encode([
        'ok' => true,
        'message' => 'Message sent successfully'
    ]);

} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'ok' => false,
        'message' => $e->getMessage()
    ]);
}
