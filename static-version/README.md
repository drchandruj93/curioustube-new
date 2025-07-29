# Curioustube - Static Blog Website

A minimal, nav.al-inspired blog website designed for Cloudflare Pages deployment.

## 🚀 Quick Deploy to Cloudflare Pages

### Step 1: Fork This Repository
1. Click the "Fork" button on GitHub
2. Create your own copy of this repository

### Step 2: Deploy to Cloudflare Pages
1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Navigate to "Workers & Pages" → "Create application" → "Pages"
3. Connect to Git and select your forked repository
4. Use these build settings:
   - **Framework preset**: None
   - **Build command**: (leave empty)
   - **Build output directory**: `/`
   - **Root directory**: `/`

### Step 3: Your Site is Live!
Your blog will be available at `your-project-name.pages.dev`

## 📁 File Structure

```
static-version/
├── index.html          # Main homepage
├── admin.html          # Content management guide
├── unsubscribe.html    # Email unsubscribe page
└── README.md           # This file
```

## ✍️ Adding New Articles

### Method 1: Direct HTML Editing
1. Open `index.html` in GitHub's web editor
2. Find the `<section class="articles">` section
3. Add this template as the first article:

```html
<article class="article">
    <div class="article-date">Jan 20 2025</div>
    <div class="article-content">
        <div class="article-preview">
            <p>Your compelling preview text that makes readers want to click "More"...</p>
            <button class="more-btn" onclick="expandArticle(this)">More</button>
        </div>
        <div class="article-full">
            <p>First paragraph of your full article...</p>
            <p>Second paragraph with more details...</p>
            <p>Final paragraph with key insights...</p>
            <button class="less-btn" onclick="collapseArticle(this)">Less</button>
        </div>
    </div>
</article>
```

4. Commit changes directly on GitHub
5. Cloudflare Pages will automatically redeploy

### Method 2: Local Development
1. Clone your repository locally
2. Edit `index.html` 
3. Push changes to GitHub
4. Automatic deployment happens

## 📧 Email Subscription Setup

The website includes a subscription modal, but you need to connect it to an email service:

### Option 1: Formspree (Recommended)
1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form
3. Replace the subscription form action in `index.html`:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Option 2: ConvertKit/Mailchimp
1. Create account with your preferred email service
2. Get the embed code for your signup form  
3. Replace the entire subscription modal with their embed code

## 🎨 Customization

### Colors and Styling
All styles are in `<style>` tags in each HTML file. Key colors:
- Background: `#000000` (pure black)
- Text: `#ffffff` (white)  
- Accent: `#666666` (gray)

### Social Media Links
Update these in the header section of `index.html`:
```html
<a href="https://twitter.com/yourusername">Twitter</a>
<a href="https://instagram.com/yourusername">Instagram</a>
```

### Website Title and Branding
Replace "Curioustube" with your site name throughout the HTML files.

## 🔧 Advanced Features

### Custom Domain
1. In Cloudflare Pages, go to Custom domains
2. Add your domain (e.g., curioustube.com)
3. Update DNS records as instructed

### Analytics
Add Google Analytics or other tracking by inserting the code before `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

## 📱 Mobile Responsive
The website is fully mobile responsive and works on all devices.

## 🎯 Features Included

✅ Nav.al-inspired dark design  
✅ Article preview/expand functionality  
✅ Reading progress indicator  
✅ Email subscription modal  
✅ Unsubscribe page  
✅ Mobile responsive  
✅ SEO optimized  
✅ Zero dependencies  

## 💡 Content Tips

Write like Naval Ravikant:
- Be concise and profound
- Share unique insights  
- Focus on timeless wisdom
- Use simple, clear language
- End with actionable takeaways

## 🆘 Support

- Visit `/admin.html` for detailed content management instructions
- All functionality works without a database
- Perfect for personal blogs and thought leadership

Start sharing your insights with the world! 🌟