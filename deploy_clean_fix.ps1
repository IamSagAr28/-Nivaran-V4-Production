# FINAL FIX SCRIPT (REAL CLEAN)
Write-Host "========================================"
Write-Host "  NIVARAN FINAL ROLLUP FIX (CLEAN)"
Write-Host "========================================"

$SERVER = "root@198.38.84.179"
$APP_DIR = "/var/www/nivaran"

Write-Host "Connecting to server: $SERVER"
Write-Host "Reinstalling from scratch..."

ssh $SERVER "cd $APP_DIR; rm -rf node_modules package-lock.json; npm install --include=optional --os=linux --cpu=x64; npm run build; cd server; pm2 restart nivaran-api; systemctl restart nginx; echo '✅ SUCCESS!'"

Write-Host ""
Write-Host "========================================"
Write-Host "  Deployed!"
Write-Host "========================================"
