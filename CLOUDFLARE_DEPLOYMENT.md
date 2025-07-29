# Cloudflare Pages Deployment Guide for Curioustube

## Prerequisites
- Cloudflare account (free tier works fine)
- GitHub repository with your Curioustube code
- Neon database (or any PostgreSQL database)

## Step 1: Prepare Your Repository

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Curioustube blog"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/curioustube.git
   git push -u origin main
   ```

## Step 2: Set Up Database

1. **Create a Neon Database**
   - Go to [neon.tech](https://neon.tech)
   - Create a free account
   - Create a new project called "curioustube"
   - Copy the connection string (DATABASE_URL)

2. **Run Database Migrations**
   ```bash
   # Install dependencies locally first
   npm install
   
   # Set your database URL
   export DATABASE_URL="your_neon_connection_string_here"
   
   # Push the schema to your database
   npm run db:push
   ```

## Step 3: Deploy to Cloudflare Pages

1. **Connect to Cloudflare Pages**
   - Go to [dash.cloudflare.com](https://dash.cloudflare.com)
   - Navigate to "Workers & Pages"
   - Click "Create application" → "Pages" → "Connect to Git"
   - Select your GitHub repository

2. **Configure Build Settings**
   ```
   Framework preset: None
   Build command: npm run build
   Build output directory: dist/public
   Root directory: /
   ```

3. **Set Environment Variables**
   In Cloudflare Pages settings → Environment variables, add:
   ```
   DATABASE_URL = your_neon_connection_string_here
   NODE_ENV = production
   ```

## Step 4: Configure Custom Domain (Optional)

1. **Add Custom Domain**
   - In Cloudflare Pages → Custom domains
   - Add "curioustube.com"
   - Follow DNS configuration instructions

2. **SSL/TLS Settings**
   - Go to SSL/TLS → Overview
   - Set encryption mode to "Full (strict)"

## Step 5: Test Your Deployment

1. **Check the deployed site**
   - Visit your Cloudflare Pages URL
   - Test article loading
   - Test subscription functionality
   - Check admin panel at `/admin`

2. **Monitor Functions**
   - Go to Workers & Pages → Your site → Functions
   - Check function logs for any errors

## Troubleshooting

### Common Issues:

1. **Database Connection Error**
   - Verify DATABASE_URL is correct in environment variables
   - Ensure database is accessible from Cloudflare

2. **Build Failures**
   - Check build logs in Cloudflare Pages
   - Ensure all dependencies are listed in package.json

3. **API Routes Not Working**
   - Verify _routes.json is in dist/public
   - Check function logs for errors

### Build Script Details

The custom build script (`build.js`) does:
1. Builds React client to `dist/public`
2. Bundles Express server to `dist/index.js`
3. Creates production package.json
4. Generates _routes.json for Cloudflare routing

## Static Export (Alternative)

If you prefer a completely static site without server functions:

1. **Modify your setup for static generation**
2. **Use build:static script instead**
3. **Deploy only the client-side application**
4. **Use external services for email subscriptions**

## Performance Optimization

1. **Enable Cloudflare caching**
2. **Use Cloudflare Image Optimization**
3. **Configure Page Rules for better caching**
4. **Enable Brotli compression**

## Security

1. **Set up proper CORS headers**
2. **Use HTTPS only**
3. **Implement rate limiting**
4. **Secure admin routes**

Your Curioustube blog will be live at your Cloudflare Pages URL with full functionality including article management and email subscriptions!