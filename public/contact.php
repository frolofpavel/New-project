<?php
/**
 * Универсальный приём заявок для статических сайтов на Timeweb shared.
 * Принимает POST (JSON или form-urlencoded), шлёт лид на email (mail())
 * и в Telegram (если задан токен). Возвращает JSON.
 *
 * Секреты — в файле ../contact_config.php (вне public_html, chmod 600):
 *   <?php
 *   $TO_EMAIL = 'wwwfrolof@yandex.ru';
 *   $SITE_NAME = 'pavelfrolof.ru';
 *   $TELEGRAM_BOT_TOKEN = '';   // вписать токен бота (опционально)
 *   $TELEGRAM_CHAT_ID   = '';   // вписать chat_id (опционально)
 */

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['message' => 'Method not allowed']);
    exit;
}

// --- конфиг (секреты вне webroot) ---
$TO_EMAIL = 'wwwfrolof@yandex.ru';
$SITE_NAME = $_SERVER['HTTP_HOST'] ?? 'site';
$TELEGRAM_BOT_TOKEN = '';
$TELEGRAM_CHAT_ID = '';
$cfg = __DIR__ . '/../contact_config.php';
if (is_file($cfg)) { include $cfg; }

// --- разбор входных данных ---
$raw = file_get_contents('php://input');
$data = [];
if ($raw) {
    $json = json_decode($raw, true);
    if (is_array($json)) { $data = $json; }
}
if (!$data) { $data = $_POST; }

// honeypot (скрытое поле website -> бот)
if (!empty($data['website'])) {
    echo json_encode(['message' => 'OK']);
    exit;
}

function clean($v) { return trim(is_string($v) ? $v : ''); }
$name    = clean($data['name'] ?? '');
$email   = clean($data['email'] ?? '');
$phone   = clean($data['phone'] ?? '');
$company = clean($data['company'] ?? '');
$message = clean($data['message'] ?? '');

if ($name === '' && $email === '' && $phone === '' && $message === '') {
    http_response_code(400);
    echo json_encode(['message' => 'Заполните форму']);
    exit;
}

// --- текст заявки ---
$lines = ["Новая заявка с {$SITE_NAME}", ''];
if ($name)    { $lines[] = "Имя: {$name}"; }
if ($phone)   { $lines[] = "Телефон: {$phone}"; }
if ($email)   { $lines[] = "Email: {$email}"; }
if ($company) { $lines[] = "Компания: {$company}"; }
if ($message) { $lines[] = ''; $lines[] = "Сообщение:"; $lines[] = $message; }
$text = implode("\n", $lines);

$okEmail = false;
$okTg = false;

// --- email через mail() ---
if ($TO_EMAIL) {
    $subject = "Заявка с {$SITE_NAME}: " . ($name ?: ($phone ?: $email));
    $headers = "From: noreply@{$SITE_NAME}\r\n";
    $headers .= "Content-Type: text/plain; charset=utf-8\r\n";
    if ($email && filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $headers .= "Reply-To: {$email}\r\n";
    }
    $okEmail = @mail($TO_EMAIL, '=?UTF-8?B?' . base64_encode($subject) . '?=', $text, $headers);
}

// --- Telegram (если задан токен) ---
if ($TELEGRAM_BOT_TOKEN && $TELEGRAM_CHAT_ID) {
    $url = "https://api.telegram.org/bot{$TELEGRAM_BOT_TOKEN}/sendMessage";
    $payload = http_build_query(['chat_id' => $TELEGRAM_CHAT_ID, 'text' => $text]);
    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $payload,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 10,
        ]);
        $resp = curl_exec($ch);
        $okTg = ($resp !== false && strpos((string)$resp, '"ok":true') !== false);
        curl_close($ch);
    } else {
        $ctx = stream_context_create(['http' => [
            'method' => 'POST',
            'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
            'content' => $payload,
            'timeout' => 10,
        ]]);
        $resp = @file_get_contents($url, false, $ctx);
        $okTg = ($resp !== false && strpos((string)$resp, '"ok":true') !== false);
    }
}

if ($okEmail || $okTg) {
    echo json_encode(['message' => 'Заявка отправлена. Спасибо!']);
} else {
    http_response_code(500);
    echo json_encode(['message' => 'Не удалось отправить заявку. Напишите напрямую.']);
}
