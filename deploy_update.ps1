# DEPLOYMENT SCRIPT - UPDATES CODE AND REBUILDS
Write-Host "========================================"
Write-Host "  NIVARAN UPDATE & DEPLOY"
Write-Host "========================================"

$SERVER = "root@198.38.84.179"
$APP_DIR = "/var/www/nivaran"

Write-Host "Connecting to server: $SERVER"
Write-Host "Updating code from GitHub..."

# 1. Pull latest code
# 2. Install Dependencies (Clean)
# 3. Build Client
# 4. Restart Services
ssh $SERVER "cd $APP_DIR; git fetch --all; git reset --hard origin/main; rm -rf node_modules package-lock.json; npm install --include=optional --os=linux --cpu=x64; npm run build; pm2 restart nivaran-api; systemctl restart nginx; echo '✅ DEPLOYMENT COMPLETE!'"

Write-Host ""
Write-Host "========================================"
Write-Host "  Finished!"
Write-Host "========================================"
