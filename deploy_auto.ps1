# Auto-deploy with password
$password = "KP7ZFg9zlsLYpj4L"
$server = "root@198.38.84.179"
$appDir = "/var/www/nivaran"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  DEPLOYING TO VPS SERVER" -ForegroundColor Cyan  
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Create expect-like script for Windows
$commands = @"
cd $appDir
git fetch origin
git reset --hard origin/main
npm install
npm run build
cd server
npm install
pm2 restart nivaran-api
pm2 status
"@

Write-Host "Connecting to $server..." -ForegroundColor Yellow

# Use plink if available
if (Get-Command plink -ErrorAction SilentlyContinue) {
    echo y | plink -batch -pw $password $server $commands
} else {
    Write-Host "Installing PSSSHSession module..." -ForegroundColor Yellow
    if (-not (Get-Module -ListAvailable -Name Posh-SSH)) {
        Install-Module -Name Posh-SSH -Force -Scope CurrentUser
    }
    
    Import-Module Posh-SSH
    
    $secPassword = ConvertTo-SecureString $password -AsPlainText -Force
    $credential = New-Object System.Management.Automation.PSCredential ("root", $secPassword)
    
    $session = New-SSHSession -ComputerName "198.38.84.179" -Credential $credential -AcceptKey
    
    $result = Invoke-SSHCommand -SessionId $session.SessionId -Command $commands
    $result.Output
    
    Remove-SSHSession -SessionId $session.SessionId
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  DEPLOYMENT COMPLETE!" -ForegroundColor Green
Write-Host "  Check: https://www.nivaranupcyclers.in" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
