# Permissions Fix Script
Write-Host "========================================"
Write-Host "  NIVARAN PERMISSIONS FIX"
Write-Host "========================================"

$SERVER = "root@198.38.84.179"
$APP_DIR = "/var/www/nivaran"

Write-Host "Connecting to server: $SERVER"
Write-Host "Changing ownership to www-data..."

# Execute Fix
ssh $SERVER "chown -R www-data:www-data $APP_DIR; chmod -R 755 $APP_DIR; systemctl restart nginx; echo 'PERMISSIONS FIXED!'"

Write-Host ""
Write-Host "========================================"
Write-Host "  Fix Complete! Check site."
Write-Host "========================================"
