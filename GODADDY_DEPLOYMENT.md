# 🚀 GoDaddy Deployment Guide - Nivaran 3.1

## 📋 **Deployment Options**

Your app has two parts:
1. **Frontend** (React + Vite) - Can be deployed as static files
2. **Backend** (Node.js + Express) - Needs Node.js hosting

---

## ✅ **RECOMMENDED: Split Deployment**

### **Frontend → GoDaddy (Static Files)**
### **Backend → Render (Free Node.js Hosting)**

This is the most reliable and cost-effective approach.

---

## 🎨 **STEP 1: Build the Frontend**

### 1.1 Update API URL for Production

**Create `.env.production`** in the root folder:
```env
VITE_API_URL=https://your-backend.onrender.com
```
(We'll get this URL after deploying the backend)

### 1.2 Build the Frontend

```bash
npm run build
```

This creates a `dist` folder with all static files.

---

## 🌐 **STEP 2: Deploy Frontend to GoDaddy**

### **Method A: Using cPanel File Manager** (Easiest)

1. **Log into GoDaddy cPanel**
   - Go to your GoDaddy account
   - Find "Web Hosting" → "Manage" → "cPanel"

2. **Navigate to File Manager**
   - Click "File Manager"
   - Go to `public_html` folder (or your domain's root folder)

3. **Clear Existing Files** (if any)
   - Select all files in `public_html`
   - Delete them

4. **Upload Your Built Files**
   - Click "Upload"
   - Upload ALL files from the `dist` folder
   - **Important**: Upload the FILES inside `dist`, not the `dist` folder itself

5. **Verify**
   - Go to your domain (e.g., `https://yourdomain.com`)
   - Your site should load!

### **Method B: Using FTP** (Alternative)

1. **Get FTP Credentials**
   - GoDaddy cPanel → "FTP Accounts"
   - Create FTP account or use existing

2. **Use FileZilla** (free FTP client)
   - Download: https://filezilla-project.org/
   - Connect using your FTP credentials
   - Upload `dist` folder contents to `public_html`

---

## 🖥️ **STEP 3: Deploy Backend to Render** (Free)

### 3.1 Prepare Backend for Deployment

**Create `server/.env.production`**:
```env
NODE_ENV=production
PORT=3001
SHOPIFY_STORE=your-store.myshopify.com
SHOPIFY_ADMIN_TOKEN=shpat_xxxxxxxxxxxxx
SESSION_KEY=your-super-secret-session-key-here-make-it-long-and-random
```

### 3.2 Create Render Account

1. Go to https://render.com
2. Sign up with GitHub (free)
3. Click "New +" → "Web Service"

### 3.3 Deploy Backend

1. **Connect GitHub**:
   - Push your code to GitHub first
   - Or use "Deploy from Git URL"

2. **Configure Service**:
   - **Name**: `nivaran-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Instance Type**: `Free`

3. **Add Environment Variables**:
   - Click "Environment" tab
   - Add all variables from `.env.production`

4. **Deploy**:
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Copy the URL (e.g., `https://nivaran-backend.onrender.com`)

### 3.4 Update Frontend API URL

1. **Update `.env.production`**:
   ```env
   VITE_API_URL=https://nivaran-backend.onrender.com
   ```

2. **Rebuild Frontend**:
   ```bash
   npm run build
   ```

3. **Re-upload to GoDaddy**:
   - Upload new `dist` folder contents

---

## 🔧 **STEP 4: Configure CORS on Backend**

Make sure `server/index.js` has correct CORS settings:

```javascript
const allowedOrigins = [
  'https://yourdomain.com',
  'https://www.yourdomain.com',
  'http://localhost:3002' // for local development
];
```

---

## ✅ **STEP 5: Test Your Deployment**

1. **Visit your domain**: `https://yourdomain.com`
2. **Check**:
   - ✅ Homepage loads
   - ✅ Products display
   - ✅ Navigation works
   - ✅ Images load
3. **Test Backend**:
   - Try login/signup
   - Check if API calls work

---

## 🚨 **Common Issues & Fixes**

### **Issue 1: Blank Page on GoDaddy**
**Fix**: Check that you uploaded files FROM `dist` folder, not the folder itself.

### **Issue 2: 404 on Page Refresh**
**Fix**: Add `.htaccess` file to `public_html`:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### **Issue 3: API Calls Failing**
**Fix**: 
- Check CORS settings in backend
- Verify `VITE_API_URL` in `.env.production`
- Check browser console for errors

### **Issue 4: Images Not Loading**
**Fix**: 
- Make sure `public` folder contents are in `dist`
- Check image paths are relative (not absolute)

---

## 📱 **Alternative: Deploy Backend to GoDaddy** (If you have Node.js hosting)

### Requirements:
- GoDaddy hosting plan with Node.js support
- SSH access

### Steps:

1. **SSH into GoDaddy**:
   ```bash
   ssh username@yourdomain.com
   ```

2. **Upload Backend**:
   - Use FTP to upload `server` folder
   - Or use Git to clone

3. **Install Dependencies**:
   ```bash
   cd server
   npm install
   ```

4. **Setup PM2** (process manager):
   ```bash
   npm install -g pm2
   pm2 start index.js --name nivaran-backend
   pm2 save
   pm2 startup
   ```

5. **Configure Apache/Nginx**:
   - Proxy requests to Node.js app
   - This varies by GoDaddy plan

---

## 📋 **Deployment Checklist**

### Frontend:
- [ ] Build frontend (`npm run build`)
- [ ] Upload `dist` contents to GoDaddy `public_html`
- [ ] Add `.htaccess` for SPA routing
- [ ] Test domain loads

### Backend:
- [ ] Create Render account
- [ ] Deploy backend to Render
- [ ] Add environment variables
- [ ] Copy backend URL
- [ ] Update frontend `.env.production`
- [ ] Rebuild and re-upload frontend

### Final:
- [ ] Test all pages
- [ ] Test API calls
- [ ] Test login/signup
- [ ] Test product loading
- [ ] Check mobile responsiveness

---

## 🎉 **You're Live!**

Once deployed, your site will be accessible at:
- **Frontend**: `https://yourdomain.com`
- **Backend**: `https://nivaran-backend.onrender.com`

---

## 📞 **Need Help?**

If you run into issues:
1. Check browser console for errors
2. Check Render logs for backend errors
3. Verify all environment variables are set
4. Check CORS configuration

---

**Ready to deploy? Let me know your GoDaddy hosting type and I'll guide you through the specific steps!**
