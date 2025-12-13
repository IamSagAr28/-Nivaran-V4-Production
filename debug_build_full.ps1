# Debug Build Output Script
Write-Host "Running build and capturing ALL output..."
$SERVER = "root@198.38.84.179"
ssh $SERVER "cd /var/www/nivaran; npm run build 2>&1"
Write-Host "Done."
