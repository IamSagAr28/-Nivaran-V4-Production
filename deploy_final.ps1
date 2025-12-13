# FINAL FIX SCRIPT
Write-Host "========================================"
Write-Host "  NIVARAN FINAL ROLLUP FIX"
Write-Host "========================================"
Write-Host ""

$SERVER = "root@198.38.84.179"
$APP_DIR = "/var/www/nivaran"

Write-Host "Connecting to server: $SERVER"
Write-Host "âš ï¸  Installing Linux Binaries..."

# Command sequence:
# 1. Install Linux dependencies explicitly
# 2. Build
# 3. Restart

ssh $SERVER "cd $APP_DIR; echo 'Installing Linux Deps...'; npm install --include=optional --os=linux --cpu=x64; echo 'Building...'; npm run build; cd server; pm2 restart nivaran-api; systemctl restart nginx; echo '✅ SUCCESS!'"

Write-Host ""
Write-Host "========================================"
Write-Host "  Deployed!"
Write-Host "========================================"
