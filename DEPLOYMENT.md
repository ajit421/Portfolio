# Portfolio Deployment Guide

## 📦 Build for Production

Before deploying, build the optimized production version:

```bash
npm run build
```

This creates an optimized bundle in the `dist/` folder.

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

**Steps:**

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel --prod
   ```

4. **Configure Environment Variables**:
   - Go to Vercel dashboard → Your project → Settings → Environment Variables
   - Add:
     - `VITE_EMAILJS_SERVICE_ID`
     - `VITE_EMAILJS_TEMPLATE_ID`
     - `VITE_EMAILJS_PUBLIC_KEY`

5. **Custom Domain** (optional):
   - Vercel dashboard → Your project → Settings → Domains
   - Add your custom domain

**Configuration**: Already included in `vercel.json`

---

### Option 2: Netlify

**Steps:**

1. **Install Netlify CLI** (if not already installed):
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**:
   ```bash
   netlify login
   ```

3. **Initialize and Deploy**:
   ```bash
   netlify init
   netlify deploy --prod
   ```

4. **Configure Environment Variables**:
   - Netlify dashboard → Your site → Site settings → Environment variables
   - Add EmailJS credentials

**Configuration**: Already included in `netlify.toml`

---

### Option 3: GitHub Pages

**Steps:**

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update `package.json`** - Add deploy script:
   ```json
   {
     "scripts": {
       "build": "vite build",
       "deploy": "npm run build && gh-pages -d dist"
     }
   }
   ```

3. **Update `vite.config.js`** - Add base path:
   ```javascript
   export default defineConfig({
     base: '/repository-name/', // Replace with your repo name
     // ... rest of config
   })
   ```

4. **Deploy**:
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: `gh-pages` branch
   - Save

---

## 🔧 Environment Variables Setup

Create a `.env` file in the project root (DO NOT commit this file):

```bash
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

**Important**: Replace `yourdomain.com` in the following files:
- `index.html` (all URL references)
- `public/sitemap.xml`
- `public/robots.txt`

---

## 📊 Performance Checklist

Before deploying, verify:

- [ ] Run `npm run build` successfully
- [ ] Test with `npm run preview`
- [ ] All images optimized (< 100KB each)
- [ ] EmailJS credentials configured
- [ ] Updated domain URLs in SEO tags
- [ ] Tested contact form
- [ ] Tested dark/light mode toggle
- [ ] Responsive design on mobile/tablet/desktop
- [ ] All links working correctly

---

## 🎯 Lighthouse Targets

Run Lighthouse audit:

```bash
npm run preview
# Then run Lighthouse in Chrome DevTools
```

**Target Scores:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

---

## 🌐 Custom Domain Setup

### Vercel:
1. Purchase domain (Namecheap, Google Domains, etc.)
2. Add domain in Vercel dashboard
3. Update DNS records as instructed

### Netlify:
1. Netlify dashboard → Domain settings → Add custom domain
2. Follow DNS configuration instructions

### GitHub Pages:
1. Add `CNAME` file to `public/` folder with your domain
2. Configure DNS A records to point to GitHub Pages IPs

---

## 🔒 Security Notes

- **Never commit `.env` file** (already in `.gitignore`)
- Security headers configured in `vercel.json` and `netlify.toml`
- CSP headers in `index.html`
- HTTPS enforced automatically by hosting platforms

---

## 📝 Post-Deployment

After deploying:

1. **Test the live site** - All features working
2. **Submit to Google Search Console**
3. **Verify structured data** - Google Rich Results Test
4. **Test Open Graph tags** - Facebook Debugger / Twitter Card Validator
5. **Monitor analytics** (if configured)

---

## 🆘 Troubleshooting

**Build fails:**
- Check Node.js version (v16+)
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check for missing dependencies

**Contact form not working:**
- Verify EmailJS credentials in environment variables
- Check browser console for errors
- Ensure CSP headers allow EmailJS domain

**404 errors on refresh:**
- Vercel/Netlify handle SPA routing automatically
- For other hosts, configure redirect rules

---

Need help? Check the [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
