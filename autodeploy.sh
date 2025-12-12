#!/bin/bash

# Nivaran V4.1 Auto-Deployment Script
# Run this on your Ubuntu VPS as root.

set -e

echo "=================================================="
echo "   🚀 STARTING NIVARAN AUTOMATED DEPLOYMENT"
echo "=================================================="

# 1. Gather Variables
echo ""
echo "Please enter the following configuration details:"
read -p "Domain Name (e.g., nivaran.com): " DNAME
read -p "Shopify Store URL (e.g., store.myshopify.com): " SHOPIFY_DOMAIN
read -p "Shopify Storefront Token: " SHOPIFY_SF_TOKEN
read -p "Shopify Admin Token (starts with shpat_): " SHOPIFY_ADMIN_TOKEN
read -p "Google Client ID: " G_CLIENT_ID
read -p "Google Client Secret: " G_CLIENT_SECRET
read -p "Session Secret (random string): " SESS_SECRET

APP_DIR="/var/www/nivaran"
REPO_URL="https://github.com/IamSagAr28/-Nivaran-V4-Production.git"

# 2. Update System
echo ""
echo "📦 Updating System & Installing Dependencies..."
apt update && apt upgrade -y
apt install -y curl git nginx certbot python3-certbot-nginx build-essential

# 3. Install Node.js 20
if ! command -v node &> /dev/null; then
    echo "🟢 Installing Node.js 20..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt install -y nodejs
else
    echo "✅ Node.js is already installed."
fi

# 4. Install PM2
echo "🟢 Installing PM2..."
npm install -g pm2

# 5. Clone Repository
echo ""
echo "📂 Setting up Project Directory..."
if [ -d "$APP_DIR" ]; then
    echo "Directory exists. Backing up..."
    mv "$APP_DIR" "$APP_DIR.bak.$(date +%s)"
fi

git clone "$REPO_URL" "$APP_DIR"
cd "$APP_DIR"

# 6. Setup Backend
echo ""
echo "🔙 Setting up Backend..."
cd server
npm install

# Create Backend .env
cat > .env <<EOL
PORT=5000
NODE_ENV=production
SESSION_SECRET=$SESS_SECRET
SHOPIFY_STORE=$SHOPIFY_DOMAIN
SHOPIFY_ADMIN_TOKEN=$SHOPIFY_ADMIN_TOKEN
GOOGLE_CLIENT_ID=$G_CLIENT_ID
GOOGLE_CLIENT_SECRET=$G_CLIENT_SECRET
FRONTEND_URL=https://$DNAME
CLIENT_URL=https://$DNAME
EOL

# Start Backend
pm2 delete nivaran-api 2>/dev/null || true
pm2 start index.js --name "nivaran-api"
pm2 save
pm2 startup | bash || true

# 7. Setup Frontend
echo ""
echo "🎨 Setting up Frontend..."
cd ..
npm install

# Create Frontend .env
cat > .env <<EOL
VITE_SHOPIFY_STORE_DOMAIN=$SHOPIFY_DOMAIN
VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=$SHOPIFY_SF_TOKEN
VITE_GOOGLE_CLIENT_ID=$G_CLIENT_ID
VITE_API_URL=https://$DNAME/api
EOL

# Build
echo "🔨 Building React App (this may take a minute)..."
npm run build

# 8. Setup Nginx
echo ""
echo "🌐 Configuring Nginx..."
cat > /etc/nginx/sites-available/nivaran <<EOL
server {
    listen 80;
    server_name $DNAME www.$DNAME;

    root $APP_DIR/dist;
    index index.html;

    # Serve Frontend
    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Proxy API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }

    # Proxy Auth
    location /auth {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOL

# Enable Site
ln -sf /etc/nginx/sites-available/nivaran /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl restart nginx

# 9. SSL
echo ""
echo "🔒 Setting up SSL with Let's Encrypt..."
certbot --nginx -d "$DNAME" -d "www.$DNAME" --non-interactive --agree-tos -m admin@$DNAME --redirect

echo ""
echo "=================================================="
echo "   🎉 DEPLOYMENT COMPLETE!"
echo "   🌍 Your site is live at: https://$DNAME"
echo "=================================================="
