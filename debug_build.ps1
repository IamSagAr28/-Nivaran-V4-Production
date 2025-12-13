# Debug Build Script
Write-Host "Debugging Build Process..."
$SERVER = "root@198.38.84.179"
ssh $SERVER "cd /var/www/nivaran; echo 'Directory:'; pwd; echo 'Node Version:'; node -v; echo 'Installing dependencies...'; npm install; echo 'Building...'; npm run build"
Write-Host "Debug run complete."
