# Automated VPS Deployment Script for Nivaran
Write-Host "========================================"
Write-Host "  NIVARAN AUTO-DEPLOY TO VPS (FORCE UPDATE)"
Write-Host "========================================"
Write-Host ""

$SERVER = "root@198.38.84.179"
$APP_DIR = "/var/www/nivaran"

Write-Host "Connecting to server: $SERVER"
Write-Host "⚠️  This will overwrite changes on the server with GitHub version."
Write-Host ""

# Execute deployment via SSH with GIT RESET HARD
ssh $SERVER "git config --global --add safe.directory $APP_DIR; cd $APP_DIR; git fetch origin; git reset --hard origin/main; npm install; npm run build; cd server; npm install; pm2 restart nivaran-api; pm2 status"

Write-Host ""
Write-Host "========================================"
Write-Host "  Deployment finished!"
Write-Host "  Check: https://www.nivaranupcyclers.in"
Write-Host "========================================"
