# Deploy pavelfrolof.ru to Timeweb
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
    throw "out/ not found. Run npm run build first."
}

$IconSvg = Join-Path $ProjectRoot "public/icon.svg"
$FaviconOut = Join-Path $OutDir "favicon.ico"
if (Test-Path $IconSvg) {
    Copy-Item $IconSvg $FaviconOut -Force
}

Write-Host "==> scp out/ -> Timeweb public_html"
scp -i $SshKey -r "$OutDir/*" $Remote
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

$Htaccess = Join-Path $OutDir ".htaccess"
if (Test-Path $Htaccess) {
    Write-Host "==> scp .htaccess (dotfile)"
    scp -i $SshKey $Htaccess "frolof@novoe.online:~/pavelfrolof.ru/public_html/.htaccess"
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}

Write-Host "OK: deploy done. Check https://pavelfrolof.ru"
