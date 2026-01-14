<?php
declare(strict_types=1);

/* =========================================================
   FORCE LOG ON FILE LOAD (CRITICAL)
   ========================================================= */
$logDir = __DIR__ . '/logs';
if (!is_dir($logDir)) {
    @mkdir($logDir, 0775, true);
}

$logFile = $logDir . '/career.log';
@file_put_contents(
    $logFile,
    "\n[" . date('Y-m-d H:i:s') . "] mail_config.php LOADED\n",
    FILE_APPEND
);

/* =========================================================
   LOGGER (ALWAYS WORKS)
   ========================================================= */
function app_log(string $title, string $data = ''): void
{
    $file = __DIR__ . '/logs/career.log';
    file_put_contents(
        $file,
        "[" . date('Y-m-d H:i:s') . "] {$title}\n{$data}\n\n",
        FILE_APPEND
    );
}

/* =========================================================
   ZOHO CONFIG — INDIA DC
   ========================================================= */
define('ZOHO_CLIENT_ID',     '1000.0LT2J991J5532F450GF0EPXILH26FW');
define('ZOHO_CLIENT_SECRET', 'bad920cdc4b86b8066f8dcd41df7468c3b2c356aa4');
define('ZOHO_REFRESH_TOKEN','1000.32e19d584f9c2aa5b10b9ce4f3ea143c.a0bc76a1f832a42929074b37143d88f6');

define('ZOHO_ACCOUNT_ID', '4453521000000002002');

define('ZOHO_TOKEN_URL', 'https://accounts.zoho.in/oauth/v2/token');
define('ZOHO_API_BASE',  'https://mail.zoho.in/api');

app_log('CONFIG', 'Zoho config loaded');

/* =========================================================
   GET ACCESS TOKEN
   ========================================================= */
function zoho_access_token(): string
{
    app_log('TOKEN', 'Request started');

    $ch = curl_init(ZOHO_TOKEN_URL);
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POSTFIELDS => http_build_query([
            'grant_type'    => 'refresh_token',
            'client_id'     => ZOHO_CLIENT_ID,
            'client_secret' => ZOHO_CLIENT_SECRET,
            'refresh_token' => ZOHO_REFRESH_TOKEN
        ]),
        CURLOPT_TIMEOUT => 20
    ]);

    $res = curl_exec($ch);
    if ($res === false) {
        app_log('TOKEN CURL ERROR', curl_error($ch));
        throw new Exception('Token curl error');
    }

    curl_close($ch);
    app_log('TOKEN RESPONSE', $res);

    $data = json_decode($res, true);
    if (!isset($data['access_token'])) {
        throw new Exception('Invalid token (see log)');
    }

    return $data['access_token'];
}

/* =========================================================
   UPLOAD ATTACHMENT
   ========================================================= */
function zoho_upload_attachment(string $token, string $tmpPath, string $fileName): array
{
    app_log('UPLOAD', 'Started: ' . $fileName);

    $url = ZOHO_API_BASE . '/accounts/' . ZOHO_ACCOUNT_ID . '/messages/attachments?uploadType=multipart';

    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POSTFIELDS => [
            'attach' => new CURLFile($tmpPath, mime_content_type($tmpPath), $fileName)
        ],
        CURLOPT_HTTPHEADER => [
            'Authorization: Zoho-oauthtoken ' . $token
        ],
        CURLOPT_TIMEOUT => 30
    ]);

    $res = curl_exec($ch);
    if ($res === false) {
        app_log('UPLOAD CURL ERROR', curl_error($ch));
        throw new Exception('Upload failed');
    }

    curl_close($ch);
    app_log('UPLOAD RESPONSE', $res);

    $data = json_decode($res, true);
    if (!isset($data['data'][0]['storeName'])) {
        throw new Exception('Upload rejected (see log)');
    }

    return [
        'storeName'      => $data['data'][0]['storeName'],
        'attachmentPath' => $data['data'][0]['attachmentPath'],
        'attachmentName' => $data['data'][0]['attachmentName']
    ];
}

/* =========================================================
   SEND MAIL
   ========================================================= */
function zoho_send_mail(
    string $from,
    string $to,
    string $subject,
    string $html,
    ?string $attachmentTmp = null,
    ?string $attachmentName = null
): void {

    app_log('MAIL', 'Send started');

    $token = zoho_access_token();

    $payload = [
        'fromAddress' => $from,
        'toAddress'   => $to,
        'subject'     => $subject,
        'content'     => $html,
        'mailFormat'  => 'html'
    ];

    if ($attachmentTmp && $attachmentName) {
        $payload['attachments'][] = zoho_upload_attachment(
            $token,
            $attachmentTmp,
            $attachmentName
        );
    }

    app_log('MAIL PAYLOAD', json_encode($payload));

    $ch = curl_init(ZOHO_API_BASE . '/accounts/' . ZOHO_ACCOUNT_ID . '/messages');
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POSTFIELDS => json_encode($payload),
        CURLOPT_HTTPHEADER => [
            'Authorization: Zoho-oauthtoken ' . $token,
            'Content-Type: application/json'
        ]
    ]);

    $res = curl_exec($ch);
    if ($res === false) {
        app_log('MAIL CURL ERROR', curl_error($ch));
        throw new Exception('Mail send failed');
    }

    curl_close($ch);
    app_log('MAIL RESPONSE', $res);
}
