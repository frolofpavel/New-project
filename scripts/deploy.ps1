# Deploy pavelfrolof.ru to Timeweb
#
# Заливка идёт ОДНИМ архивом, а не пофайловым scp -r: канал до Timeweb
# нестабилен, и передача 70 МБ тысячами файлов рвётся на середине
# (инцидент 21.08.2026 — соединение закрылось, деплой не прошёл, но скрипт
# отрапортовал успех).
#
# По умолчанию тяжёлая неизменная статика не пересылается — она уже на
# сервере. Нужно залить и её (новое видео, новое КП) — ключ -Full.

param(
    [switch]$SkipBuild,
    [switch]$Full
)

$ErrorActionPreference = "Stop"

$ProjectRoot = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$OutDir = Join-Path $ProjectRoot "out"
$SshKey = "C:/Users/Pavel/.ssh/id_ed25519"
$SshHost = "frolof@novoe.online"
$RemoteDir = "~/pavelfrolof.ru/public_html"

# Каталоги, которые меняются редко и весят десятки мегабайт
$HeavyDirs = @("media", "proposals", "kp", "demo")

Set-Location $ProjectRoot

if (-not $SkipBuild) {
    Write-Host "==> npm run build"
    npm run build
    if ($LASTEXITCODE -ne 0) { throw "build failed" }
}

if (-not (Test-Path $OutDir)) {
    throw "out/ not found. Run npm run build first."
}

# favicon.ico рядом с icon.svg — часть браузеров всё ещё просит именно его
$IconSvg = Join-Path $ProjectRoot "public/icon.svg"
if (Test-Path $IconSvg) {
    Copy-Item $IconSvg (Join-Path $OutDir "favicon.ico") -Force
}

$Archive = Join-Path $env:TEMP "pavelfrolof-deploy.tgz"
if (Test-Path $Archive) { Remove-Item $Archive -Force }

$TarArgs = @("czf", $Archive, "-C", $OutDir)
if (-not $Full) {
    foreach ($d in $HeavyDirs) { $TarArgs += "--exclude=$d" }
}
$TarArgs += "."

Write-Host "==> pack out/ -> archive$(if (-not $Full) { ' (без ' + ($HeavyDirs -join ', ') + ')' })"
& tar @TarArgs
if ($LASTEXITCODE -ne 0) { throw "tar failed" }

$SizeMb = [math]::Round((Get-Item $Archive).Length / 1MB, 1)
Write-Host "    архив: $SizeMb MB"

Write-Host "==> upload"
& scp -i $SshKey -o ConnectTimeout=30 -o ServerAliveInterval=15 $Archive "${SshHost}:~/deploy.tgz"
if ($LASTEXITCODE -ne 0) { throw "upload failed — деплой НЕ применён, сайт не тронут" }

# chmod обязателен: архив пакуется на Windows, где права выходят 600/700.
# Распаковка переносит их на сервер, и веб-сервер перестаёт читать файлы —
# сайт молча ложится (инцидент 21.08.2026).
Write-Host "==> unpack on server + fix permissions"
$RemoteCmd = "cd $RemoteDir && tar xzf ~/deploy.tgz && rm -f ~/deploy.tgz && " +
             "find . -type d -exec chmod 755 {} + && find . -type f -exec chmod 644 {} + && echo UNPACK_OK"
& ssh -i $SshKey -o ConnectTimeout=30 $SshHost $RemoteCmd
if ($LASTEXITCODE -ne 0) { throw "unpack failed" }

Remove-Item $Archive -Force

# Приёмка: молчаливый успех без проверки — это брак
Write-Host "==> smoke-test"
$Failed = @()
foreach ($path in @("/", "/blog/", "/direktor-po-marketingu/", "/sitemap.xml")) {
    try {
        $code = (Invoke-WebRequest -Uri "https://pavelfrolof.ru$path" -UseBasicParsing -TimeoutSec 25).StatusCode
    } catch {
        $code = 0
    }
    Write-Host "    $code  $path"
    if ($code -ne 200) { $Failed += $path }
}

if ($Failed.Count -gt 0) {
    throw "smoke-test failed: $($Failed -join ', ')"
}

Write-Host "OK: deploy done. https://pavelfrolof.ru"
