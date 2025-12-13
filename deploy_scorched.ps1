# Scorched Earth Deployment Script
Write-Host "========================================"
Write-Host "  NIVARAN SCORCHED EARTH DEPLOY"
Write-Host "========================================"

$SERVER = "root@198.38.84.179"
$APP_DIR = "/var/www/nivaran"

Write-Host "Connecting to server: $SERVER"

# Execute simplified command string
ssh $SERVER "cd $APP_DIR; rm -rf dist build; git pull origin main; npm run build; ls -d dist build 2>/dev/null; cd server; pm2 restart nivaran-api; systemctl restart nginx"

Write-Host ""
Write-Host "========================================"
Write-Host "  Complete!"
Write-Host "  Check: https://www.nivaranupcyclers.in"
Write-Host "========================================"
