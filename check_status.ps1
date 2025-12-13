# Check Server Status Custom Script
Write-Host "Checking deployment status on server..."
$SERVER = "root@198.38.84.179"
ssh $SERVER "ls -l /var/www/nivaran/dist/index.html; echo '---'; tail -n 20 /root/.pm2/logs/nivaran-api-out.log"
Write-Host "Done."
