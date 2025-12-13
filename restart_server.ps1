# Restart Servers Script
Write-Host "Restarting Nginx and PM2..."
$SERVER = "root@198.38.84.179"
ssh $SERVER "systemctl restart nginx; pm2 restart nivaran-api; echo 'Server Restarted!'"
Write-Host "Done."
