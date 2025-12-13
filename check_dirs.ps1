# Diagnostic Script
Write-Host "Checking Directory Structure..."
$SERVER = "root@198.38.84.179"
ssh $SERVER "ls -la /var/www/nivaran; echo '--- DIST ---'; ls -la /var/www/nivaran/dist; echo '--- BUILD ---'; ls -la /var/www/nivaran/build"
Write-Host "Done."
