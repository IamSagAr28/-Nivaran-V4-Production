# Automated VPS Deployment Script for Nivaran
Write-Host "========================================"
Write-Host "  NIVARAN VPS REPAIR & DEPLOY"
Write-Host "========================================"
Write-Host ""

$SERVER = "root@198.38.84.179"
$APP_DIR = "/var/www/nivaran"

Write-Host "Connecting to server: $SERVER"
Write-Host "âš ï¸  Performing Clean Install (may take 2-3 mins)..."
Write-Host ""

# Execute deployment via SSH with CLEAN INSTALL
# We will remove node_modules and reinstall to fix MODULE_NOT_FOUND errors
ssh $SERVER "cd $APP_DIR; echo 'cleaning...'; rm -rf node_modules package-lock.json; echo 'pulling...'; git reset --hard origin/main; git pull origin main; echo 'installing...'; npm install; echo 'building...'; npm run build; cd server; echo 'backend setup...'; npm install; pm2 restart nivaran-api; pm2 save; echo 'DONE!'"

Write-Host ""
Write-Host "========================================"
Write-Host "  Repair & Deployment finished!"
Write-Host "  Check: https://www.nivaranupcyclers.in"
Write-Host "========================================"
