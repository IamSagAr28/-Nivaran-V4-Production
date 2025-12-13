# Automated VPS Deployment Script for Nivaran
Write-Host "========================================"
Write-Host "  NIVARAN VPS REPAIR (LINUX ROLLUP FIX)"
Write-Host "========================================"
Write-Host ""

$SERVER = "root@198.38.84.179"
$APP_DIR = "/var/www/nivaran"

Write-Host "Connecting to server: $SERVER"
Write-Host " Fixing platform specific dependencies..."
Write-Host ""

# Execute deployment via SSH with NPM PLATFORM FLAGS
ssh $SERVER "cd $APP_DIR; rm -rf node_modules package-lock.json; git pull origin main; npm install --include=optional --os=linux --cpu=x64; npm run build; cd server; npm install; pm2 restart nivaran-api; pm2 status; echo '✅ FIXED & DEPLOYED!'"

Write-Host ""
Write-Host "========================================"
Write-Host "  Fix Complete!"
Write-Host "  Check: https://www.nivaranupcyclers.in"
Write-Host "========================================"
