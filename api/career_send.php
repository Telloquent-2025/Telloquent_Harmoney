<?php
declare(strict_types=1);

header('Content-Type: application/json');

require __DIR__ . '/mail_config_career.php';

app_log('CAREER', 'career_send.php reached');

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Invalid request');
    }

    /* ===== INPUTS ===== */
    $fullName = trim($_POST['fullName'] ?? '');
    $email    = trim($_POST['email'] ?? '');
    $phone    = trim($_POST['phone'] ?? '');
    $position = trim($_POST['position'] ?? '');
    $exp      = trim($_POST['experience'] ?? '');
    $company  = trim($_POST['current_company'] ?? '');
    $cover    = trim($_POST['cover_letter'] ?? '');
    $consent  = isset($_POST['consent']);

    if (
        $fullName === '' ||
        !filter_var($email, FILTER_VALIDATE_EMAIL) ||
        $phone === '' ||
        $position === '' ||
        $exp === '' ||
        !$consent
    ) {
        throw new Exception('Please fill all required fields');
    }

    /* ===== FILE CHECK (UNCHANGED) ===== */
    if (!isset($_FILES['resume'])) {
        throw new Exception('Resume missing');
    }

    /* ===== ESCAPE ===== */
    $fullNameEsc = htmlspecialchars($fullName, ENT_QUOTES, 'UTF-8');
    $emailEsc    = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
    $phoneEsc    = htmlspecialchars($phone, ENT_QUOTES, 'UTF-8');
    $positionEsc = htmlspecialchars($position, ENT_QUOTES, 'UTF-8');
    $expEsc      = htmlspecialchars($exp, ENT_QUOTES, 'UTF-8');
    $companyEsc  = htmlspecialchars($company ?: '—', ENT_QUOTES, 'UTF-8');
    $coverEsc    = nl2br(htmlspecialchars($cover ?: '—', ENT_QUOTES, 'UTF-8'));

    /* ===== EMAIL BODY (CAREER ONLY) ===== */
    $body = "
    <div style='font-family: Arial, sans-serif; max-width:600px; color:#333;'>
        <h2 style='color:#0b5ed7;'>Career Application Submission</h2>

        <table cellpadding='8' cellspacing='0' style='border-collapse: collapse; width:100%;'>
            <tr><td width='160'><strong>Full Name</strong></td><td>{$fullNameEsc}</td></tr>
            <tr><td><strong>Email</strong></td><td>{$emailEsc}</td></tr>
            <tr><td><strong>Phone</strong></td><td>{$phoneEsc}</td></tr>
            <tr><td><strong>Position Applied</strong></td><td>{$positionEsc}</td></tr>
            <tr><td><strong>Total Experience</strong></td><td>{$expEsc} years</td></tr>
            <tr><td><strong>Current Company</strong></td><td>{$companyEsc}</td></tr>
        </table>

        <hr style='margin:20px 0;'>

        <p><strong>Cover Letter:</strong></p>
        <div style='background:#f8f9fa; padding:12px; border-left:4px solid #0b5ed7;'>
            {$coverEsc}
        </div>

        <p style='font-size:12px; color:#777;'>
            Sent from Harmoney FinServ Website – Careers page
        </p>
    </div>
    ";

    /* ===== SEND MAIL (ATTACHMENT LOGIC SAME) ===== */
    zoho_send_mail(
        'careers@harmoneywealth.com',
        'careers@harmoneywealth.com',
        'Contact from Website – Careers Page',
        $body,
        $_FILES['resume']['tmp_name'],
        $_FILES['resume']['name']
    );

    echo json_encode(['ok' => true, 'message' => 'Application submitted successfully']);

} catch (Throwable $e) {
    app_log('CAREER ERROR', $e->getMessage());
    echo json_encode(['ok' => false, 'error' => $e->getMessage()]);
}
