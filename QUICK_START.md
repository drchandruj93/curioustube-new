# Quick Start Guide - Curioustube Blog

## 🚀 Get Your Blog Live in 15 Minutes

### Step 1: Push to GitHub (2 minutes)
```bash
git init
git add .
git commit -m "Curioustube blog setup"
git remote add origin https://github.com/YOUR_USERNAME/curioustube.git
git push -u origin main
```

### Step 2: Set Up Database (3 minutes)
1. Go to [neon.tech](https://neon.tech) and create free account
2. Create new project called "curioustube"
3. Copy the connection string
4. Run locally: `export DATABASE_URL="your_connection_string" && npm run db:push`

### Step 3: Deploy to Cloudflare Pages (5 minutes)
1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Workers & Pages → Create → Connect Git → Select your repo
3. Build settings:
   - Build command: `npm run build`
   - Build output: `dist/public`
4. Environment variables:
   - `DATABASE_URL` = your Neon connection string
   - `NODE_ENV` = production

### Step 4: Start Publishing (5 minutes)
1. Visit your deployed site at `/admin`
2. Click "New Article"
3. Write your first post
4. Click "Create Article"

## ✅ You're Live!

Your nav.al-inspired blog is now running with:
- Dark theme design exactly like nav.al
- Email subscription system
- Admin panel for content management
- Reading progress indicator
- Mobile-responsive layout

## Next Steps

1. **Custom Domain**: Add curioustube.com in Cloudflare Pages settings
2. **Email Service**: Set up Resend/Mailgun for subscriber notifications
3. **Content**: Start publishing your thoughts and insights
4. **Social**: Update social media links in the header

## Support Files Created

- `CLOUDFLARE_DEPLOYMENT.md` - Detailed deployment instructions
- `CONTENT_MANAGEMENT_GUIDE.md` - How to write and publish content
- `EMAIL_SUBSCRIPTION_GUIDE.md` - Email system setup and management
- `build.js` - Custom build script for Cloudflare Pages
- `wrangler.toml` - Cloudflare configuration
- `_routes.json` - API routing configuration

Your Curioustube blog is ready for the world! 🌟