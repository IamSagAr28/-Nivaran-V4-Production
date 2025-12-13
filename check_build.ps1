# Check BUILD Script
Write-Host "Checking BUILD directory..."
$SERVER = "root@198.38.84.179"
ssh $SERVER "ls -la /var/www/nivaran/build/index.html"
Write-Host "Done."
