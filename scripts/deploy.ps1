# Деплой pavelfrolof.ru → Timeweb

param(
    [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"

$ProjectRoot = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$OutDir = Join-Path $ProjectRoot "out"
$SshKey = "C:/Users/Pavel/.ssh/id_ed25519"
$Remote = "frolof@novoe.online:~/pavelfrolof.ru/public_html/"

Set-Location $ProjectRoot

if (-not $SkipBuild) {
    Write-Host "==> npm run build"
    npm run build
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}

if (-not (Test-Path $OutDir)) {
    Write-Error "Папка out/ не найдена. Сначала npm run build."
}

Write-Host "==> rsync/scp out/ -> Timeweb public_html"
Write-Host "    (proposals/ на сервере не трогаем — только заливка out/*)"

# scp рекурсивно: содержимое out/, не удаляет лишние файлы на сервере
scp -i $SshKey -r "$OutDir/*" $Remote

Write-Host ""
Write-Host "OK: деплой завершён. Проверка:"
Write-Host "  curl.exe -sI https://pavelfrolof.ru | findstr HTTP"
Write-Host ""
Write-Host "Форма: contact.php + ~/pavelfrolof.ru/contact_config.php (вне public_html)"
