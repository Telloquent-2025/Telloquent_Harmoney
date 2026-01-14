<?php
declare(strict_types=1);

/* =========================================================
   FORCE LOG ON FILE LOAD (CRITICAL)
   ========================================================= */
$logDir = __DIR__ . '/logs';
if (!is_dir($logDir)) {
    @mkdir($logDir, 0775, true);
}

$logFile = $logDir . '/support.log';
@file_put_contents(
    $logFile,
    "\n[" . date('Y-m-d H:i:s') . "] mail_config_support.php LOADED\n",
    FILE_APPEND
);

/* =========================================================
   LOGGER
   ========================================================= */
function app_log(string $title, string $data = ''): void
{
    $file = __DIR__ . '/logs/support.log';
    file_put_contents(
        $file,
        "[" . date('Y-m-d H:i:s') . "] {$title}\n{$data}\n\n",
        FILE_APPEND
    );
}

/* =========================================================
   ZOHO CONFIG — INDIA DC
   ========================================================= */
define('ZOHO_CLIENT_ID',     '1000.SPIK9PRB8FQ7W144BKOHZEMULMM8VF');
define('ZOHO_CLIENT_SECRET', '746bcdb4a9f5bccd2f100bd457c147427b86ac9ec5');
define('ZOHO_REFRESH_TOKEN','1000.ed14e03cac532ea972138e98e0087c18.bc3954f7bf403b9d4ee9f885d20e1cde');

define('ZOHO_ACCOUNT_ID', '7169844000000002002');

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
        throw new Exception('Support token curl error');
    }

    curl_close($ch);
    app_log('TOKEN RESPONSE', $res);

    $data = json_decode($res, true);
    if (!isset($data['access_token'])) {
        throw new Exception('Invalid support token (check log)');
    }

    return $data['access_token'];
}

/* =========================================================
   UPLOAD ATTACHMENT
   ========================================================= */
function zoho_upload_attachment(string $token, string $tmpPath, string $fileName): array
{
    app_log('UPLOAD', 'Started: ' . $fileName);

    $url = ZOHO_API_BASE
        . '/accounts/' . ZOHO_ACCOUNT_ID
        . '/messages/attachments?uploadType=multipart';

    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POSTFIELDS => [
            'attach' => new CURLFile(
                $tmpPath,
                mime_content_type($tmpPath) ?: 'application/octet-stream',
                $fileName
            )
        ],
        CURLOPT_HTTPHEADER => [
            'Authorization: Zoho-oauthtoken ' . $token
        ],
        CURLOPT_TIMEOUT => 30
    ]);

    $res = curl_exec($ch);
    if ($res === false) {
        app_log('UPLOAD CURL ERROR', curl_error($ch));
        throw new Exception('Support attachment upload failed');
    }

    curl_close($ch);
    app_log('UPLOAD RESPONSE', $res);

    $data = json_decode($res, true);
    if (!isset($data['data'][0]['storeName'])) {
        throw new Exception('Support upload rejected (see log)');
    }

    return [
        'storeName'      => $data['data'][0]['storeName'],
        'attachmentPath' => $data['data'][0]['attachmentPath'],
        'attachmentName' => $data['data'][0]['attachmentName']
    ];
}

/* =========================================================
   SEND MAIL (SUPPORT)
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

    $ch = curl_init(
        ZOHO_API_BASE . '/accounts/' . ZOHO_ACCOUNT_ID . '/messages'
    );
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POSTFIELDS => json_encode($payload),
        CURLOPT_HTTPHEADER => [
            'Authorization: Zoho-oauthtoken ' . $token,
            'Content-Type: application/json'
        ],
        CURLOPT_TIMEOUT => 20
    ]);

    $res = curl_exec($ch);
    if ($res === false) {
        app_log('MAIL CURL ERROR', curl_error($ch));
        throw new Exception('Support mail send failed');
    }

    curl_close($ch);
    app_log('MAIL RESPONSE', $res);
}
