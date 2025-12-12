# Nivarn - Eco-Friendly Products

*Last updated: November 24, 2025*

This is a modern, eco-friendly e-commerce website built with React, TypeScript, and Vite.

## 🌿 Features

- **Full-width Hero Slideshow** with auto-advancing slides
- **Product Categories** with real product images
- **Responsive Design** optimized for all devices
- **Eco-friendly Color Palette** 
- **Smooth Animations** and transitions

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

1. Push your code to GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Sign up/login with GitHub
4. Click "Import Project" 
5. Select your GitHub repository
6. Vercel will automatically detect it's a Vite project
7. Click "Deploy" - it handles build automatically!

### Option 2: Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Sign up/login with GitHub
4. Click "New site from Git"
5. Choose GitHub and select your repository
6. Build command: `npm run build`
7. Publish directory: `dist`
8. Click "Deploy site"

### Option 3: GitHub Pages

1. Your code includes GitHub Actions workflow
2. Push to GitHub repository
3. Go to repository Settings → Pages
4. Select "GitHub Actions" as source
5. Push to main branch triggers automatic deployment

### Option 4: Manual Build & Upload

```bash
npm install
npm run build
# Upload the 'dist' folder to any web hosting service
```

## 🛠️ Local Development

```bash
npm install
npm run dev
```

Visit `http://localhost:3003`

## 📁 Project Structure

- `src/components/` - React components
- `src/styles/` - Global styles  
- `public/` - Static assets
- `dist/` - Built production files (after npm run build)

## 🎨 Design System

- **Primary Colors:** Hunter Green (#3a5a40), Fern Green (#588157)
- **Accent Colors:** Sage (#a3b18a), Timberwolf (#dad7cd)
- **Framework:** React 18 + TypeScript + Vite + Tailwind CSS