# Deploying Nivaran 4.1 to a VPS (e.g., Hostng Raja)

This guide assumes you have a **Linux VPS** (Ubuntu 20.04/22.04 recommended) with **root** access via SSH.

---

## Prerequisities

You will need:
1.  **IP Address** of your VPS.
2.  **SSH Credentials** (username, usually `root`, and password/key).
3.  **Domain Name** pointed to your VPS IP address (A Record).

---

## Step 1: Initial Server Setup

Login to your server:
```bash
ssh root@your_server_ip
```

Update packages and install essential tools:
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install curl git nginx -y
```

### Install Node.js (v18 or v20)
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

Verify installation:
```bash
node -v
npm -v
```

### Install Global Tools
```bash
sudo npm install -g pm2 yarn
```
*PM2 is a process manager to keep your Node.js backend alive.*

---

## Step 2: Clone the Repository

Navigate to the web directory:
```bash
cd /var/www
```

Clone your project (replace with your actual repo URL):
```bash
git clone https://github.com/IamSagAr28/Niraran-4.1.git nivaran
cd nivaran
```

---

## Step 3: Backend Setup

Navigate to the server directory:
```bash
cd server
```

Install dependencies:
```bash
npm install
```

### Configure Environment Variables
Create a `.env` file:
```bash
nano .env
```

Paste your backend environment variables (adjust values as needed):
```env
PORT=5000
NODE_ENV=production
SESSION_SECRET=your_super_complex_secret_key
# Database
# If using SQLite (default), no change needed.
# If using Postgres, add DATABASE_URL=...

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Shopify
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_ACCESS_TOKEN=your_token

# Frontend URL (Important for CORS)
FRONTEND_URL=https://your-domain.com
CLIENT_URL=https://your-domain.com
```
*Press `Ctrl+X`, then `Y`, then `Enter` to save.*

### Start Backend with PM2
```bash
pm2 start index.js --name "nivaran-api"
pm2 save
pm2 startup
```
*(Run the command displayed by `pm2 startup` to save it for reboots)*

---

## Step 4: Frontend Setup

Go back to the project root:
```bash
cd /var/www/nivaran
```

Install dependencies:
```bash
npm install
```

### Configure Environment Variables
Create a `.env` file:
```bash
nano .env
```

Paste your frontend environment variables:
```env
VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_token
VITE_GOOGLE_CLIENT_ID=your_google_client_id

# Backend API URL
VITE_API_URL=https://your-domain.com/api
```
*Press `Ctrl+X`, then `Y`, then `Enter` to save.*

### Build the Project
```bash
npm run build
```
This will create a `dist` folder with your static site.

---

## Step 5: Nginx Configuration

Create a new Nginx config file for your site:
```bash
sudo nano /etc/nginx/sites-available/nivaran
```

Add the following configuration (replace `your-domain.com` with your actual domain):

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    root /var/www/nivaran/dist;
    index index.html;

    # Serve Frontend (Single Page App)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Proxy API requests to Backend
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Proxy Auth requests to Backend
    location /auth {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/nivaran /etc/nginx/sites-enabled/
```

Remove the default site (if desired):
```bash
sudo rm /etc/nginx/sites-enabled/default
```

Test Nginx configuration:
```bash
sudo nginx -t
```

Restart Nginx:
```bash
sudo systemctl restart nginx
```

---

## Step 6: SSL Setup (HTTPS)

Install Certbot:
```bash
sudo apt install certbot python3-certbot-nginx -y
```

Obtain an SSL certificate:
```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```
Follow the prompts (enter email, agree to terms). Certbot will automatically update your Nginx config to force HTTPS.

---

## Step 7: Final Checks

1.  **Google Console:** Update your OAuth Authorized Javascript Origins to `https://your-domain.com` and Redirect URI to `https://your-domain.com/api/auth/google/callback`.
2.  **Shopify:** Ensure your Storefront API token allows access from your domain (if applicable, though usually loose for Storefront API).
3.  **Firewall:** Ensure ports 80 and 443 are open on your VPS firewall (e.g., `ufw allow 'Nginx Full'`).


---

## Step 8: How to Update Your Website

**Recommended Workflow:**
Never edit files directly on the server. It is risky and hard to undo errors. Instead, follow this flow:

1.  **Develop Locally:** Make changes on your local computer.
2.  **Push to GitHub:**
    ```bash
    git add .
    git commit -m "Description of changes"
    git push origin main
    ```
3.  **Pull on Server:**
    SSH into your VPS and run:
    ```bash
    cd /var/www/nivaran
    git pull origin main
    ```

### Applying Changes
After pulling the new code, you must apply the changes depending on what you modified:

**If you changed Frontend (React/UI):**
```bash
npm install       # (Only if you added new packages)
npm run build     # Re-build the static files
```
*No restart needed, Nginx sees the new files immediately.*

**If you changed Backend (Server/API):**
```bash
cd server
npm install       # (Only if you added new packages)
pm2 restart nivaran-api
```
*Restart is required for backend code to reload.*

**Congratulations! Your Nivaran project should now be live on your VPS.**

