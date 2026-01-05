# Repair and Redeploy Script
$SERVER = "root@198.38.84.179"
$APP_DIR = "/var/www/nivaran"

Write-Host "Connecting to $SERVER to repair deployment..."

# Command to:
# 1. Go to dir
# 2. Pull latest code
# 3. Remove node_modules (Fix corruption)
# 4. Re-install dependencies
# 5. Build
# 6. Restart

$CMD = "cd $APP_DIR; git reset --hard origin/main; rm package-lock.json; rm -rf node_modules; npm install; npm run build; pm2 restart all; pm2 save"

ssh $SERVER $CMD

Write-Host "Repair Finished. Check site."
