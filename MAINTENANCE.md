# 🛠️ Portfolio Maintenance Guide

Complete guide for keeping your portfolio up-to-date, secure, and performing optimally.

## 📅 Regular Maintenance Schedule

### Weekly
- [ ] Check for broken links (GitHub repos, external sites)
- [ ] Review contact form submissions (if using EmailJS)
- [ ] Monitor site performance (Lighthouse scores)

### Monthly
- [ ] Update dependencies: `npm update`
- [ ] Check for security vulnerabilities: `npm audit`
- [ ] Review and update certifications
- [ ] Add new projects if completed

### Quarterly
- [ ] Major dependency updates: `npm outdated`
- [ ] SEO audit (Google Search Console)
- [ ] Content refresh (bio, skills, experience)
- [ ] Backup repository (git + static files)

### Annually
- [ ] SSL certificate renewal (auto with Vercel/Netlify)
- [ ] Domain renewal
- [ ] Analytics review
- [ ] Full content review and updates

## 🔒 Security Maintenance

### Dependency Updates

**Check for updates:**
```bash
npm outdated
```

**Update safely:**
```bash
# Update minor/patch versions
npm update

# Update major versions (test carefully!)
npm install package-name@latest
```

**Security audit:**
```bash
npm audit
npm audit fix  # Auto-fix if available
```

### Security Headers

**Verify headers:**
- Use [securityheaders.com](https://securityheaders.com/)
- Check your deployed site
- Should show A or A+ rating

**Already configured in:**
- `vercel.json`
- `netlify.toml`
- `index.html` (CSP headers)

### Environment Variables

**Never commit:**
- `.env` file (in `.gitignore`)
- API keys
- Email credentials

**Update regularly:**
- EmailJS keys (if rotated)
- GitHub tokens (if used)

## 📊 Performance Monitoring

### Lighthouse Audits

**Run locally:**
1. Build production: `npm run build`
2. Preview: `npm run preview`
3. Open Chrome DevTools → Lighthouse
4. Run audit

**Target scores:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

### Bundle Size Monitoring

**Check after builds:**
```bash
npm run build
# Look for output showing chunk sizes
```

**Warning signs:**
- Main bundle > 500KB
- Vendor chunk > 300KB
- Total > 1MB

**Solutions:**
- Code splitting (already configured)
- Lazy load heavy components
- Optimize images

## 🔗 Link Maintenance

### Automated Checking

Create `.github/workflows/link-checker.yml`:
```yaml
name: Check Links
on:
  schedule:
    - cron: '0 0 1 * *'  # Monthly
jobs:
  link-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: lycheeverse/lychee-action@v1
        with:
          args: --verbose --no-progress '**/*.md' '**/*.html'
```

### Manual Checking

**Tools:**
- [Dead Link Checker](https://www.deadlinkchecker.com/)
- Browser extension: Check My Links

**Common broken links:**
- GitHub repos (renamed/deleted)
- External tools/services
- Social media profiles

## 📈 Analytics Setup (Optional)

### Google Analytics 4

**1. Create GA4 Property:**
- Visit [analytics.google.com](https://analytics.google.com/)
- Create new property
- Get Measurement ID (G-XXXXXXXXXX)

**2. Add to Portfolio:**

**File:** `index.html`
```html
<head>
  <!-- ... existing tags ... -->
  
  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>
</head>
```

**3. Privacy Compliance:**
- Add cookie notice (if in EU)
- Update privacy policy
- Use anonymizeIp option

### Custom Events

Track important actions:

**File:** Create `src/utils/analytics.js`
```javascript
export const trackEvent = (category, action, label) => {
  if (typeof gtag !== 'undefined') {
    gtag('event', action, {
      event_category: category,
      event_label: label
    });
  }
};
```

**Usage in components:**
```javascript
import { trackEvent } from '@/utils/analytics'

// Track project clicks
trackEvent('Projects', 'click', projectName)

// Track contact form submissions
trackEvent('Contact', 'submit', 'contact_form')
```

## 💾 Backup Strategy

### Git Repository (Primary)

**Already backed up if using:**
- GitHub (cloud backup)
- GitLab
- Bitbucket

**Best practices:**
- Commit regularly
- Use meaningful commit messages
- Tag releases: `git tag v1.0.0`

### Static Files Export

**Quarterly backup:**
```bash
# Build site
npm run build

# Archive dist folder
tar -czf portfolio-backup-$(date +%Y%m%d).tar.gz dist/

# Or on Windows:
# Zip the dist folder manually
```

**Store backups:**
- External drive
- Cloud storage (Google Drive, Dropbox)
- Secondary git remote

### Database Backups

If you add a database later:
- Automated daily backups
- Store off-site
- Test restoration quarterly

## 🚀 Performance Optimization Checklist

- [ ] **Images:**
  - Compressed (TinyPNG, Squoosh)
  - WebP format where possible
  - Lazy loading enabled

- [ ] **Code:**
  - Minified (automatic with Vite)
  - Tree shaking enabled
  - No console.logs in production

- [ ] **Fonts:**
  - Preload critical fonts
  - font-display: swap
  - Limited font weights loaded

- [ ] **Caching:**
  - Static assets cached (configured in deployment)
  - Service worker (optional, for offline support)

## 🐛 Troubleshooting Common Issues

### Build Fails

**Check:**
1. Node version: `node --version` (should be v16+)
2. Clean install: `rm -rf node_modules && npm install`
3. Check `package-lock.json` exists
4. Review error messages in terminal

### Contact Form Not Working

**Debug:**
1. Check EmailJS credentials in `.env`
2. Verify Service ID, Template ID, Public Key
3. Check browser console for errors
4. Test with EmailJS dashboard

### Projects Not Loading

**Debug:**
1. Check GitHub username in `githubService.js`
2. Verify GitHub API isn't rate-limited
3. Check browser console for API errors
4. Fallback data in `projectsFallback.json` should display

### Dark Mode Issues

**Debug:**
1. Clear localStorage: `localStorage.clear()`
2. Check Tailwind dark mode config
3. Verify dark: classes in components
4. Test in incognito mode

## 📝 Documentation Updates

When making changes:

1. **Update relevant guide:**
   - Content changes → `CONTENT_UPDATE.md`
   - Theme changes → `THEME_CUSTOMIZATION.md`
   - Projects → `UPDATE_PROJECTS.md`

2. **Update README.md** if adding features

3. **Update DEPLOYMENT.md** if deployment process changes

## 🔍 SEO Maintenance

### Google Search Console

**Setup:**
1. Verify ownership: [search.google.com/search-console](https://search.google.com/search-console)
2. Submit sitemap: `https://yourdomain.com/sitemap.xml`
3. Monitor indexing status

### Meta Tags Updates

When content changes significantly:

**File:** `index.html`
- Update description
- Update Open Graph image if changed
- Update lastmod in `sitemap.xml`

### Structured Data

**Validate periodically:**
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- Ensure JSON-LD data is current

## 📞 Support Resources

**Vite Issues:**
- [Vite Documentation](https://vitejs.dev/)
- [Vite Discord](https://chat.vitejs.dev/)

**Vue Issues:**
- [Vue Documentation](https://vuejs.org/)
- [Vue Forum](https://forum.vuejs.org/)

**Tailwind Issues:**
- [Tailwind Documentation](https://tailwindcss.com/docs)
- [Tailwind Discord](https://tailwindcss.com/discord)

**Deployment:**
- [Vercel Support](https://vercel.com/support)
- [Netlify Support](https://www.netlify.com/support/)

---

## 🎯 Quick Reference

| Task | File | Frequency |
|------|------|-----------|
| Add certification | `src/data/certifications.json` | As needed |
| Update bio | `src/components/AboutSection.vue` | Quarterly |
| Add project | GitHub repo (auto) | As needed |
| Change email | `ContactSection.vue` + `FooterSection.vue` | As needed |
| Update dependencies | `npm update` | Monthly |
| Security audit | `npm audit` | Monthly |
| Performance check | Lighthouse | Monthly |
| Backup | Export dist/ | Quarterly |

---

Need specific help? See:
- [CONTENT_UPDATE.md](CONTENT_UPDATE.md) - Updating portfolio content
- [UPDATE_PROJECTS.md](UPDATE_PROJECTS.md) - Managing projects
- [THEME_CUSTOMIZATION.md](THEME_CUSTOMIZATION.md) - Changing design
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment instructions
