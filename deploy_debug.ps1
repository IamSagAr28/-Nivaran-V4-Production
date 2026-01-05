$SERVER = "root@198.38.84.179"
$APP_DIR = "/var/www/nivaran"
# Run build and capture stderr/stdout
ssh $SERVER "cd $APP_DIR; npm run build 2>&1"
