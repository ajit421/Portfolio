# 📋 Portfolio Quick Reference

**One-page cheat sheet for common portfolio maintenance tasks.**

---

## 🚀 Getting Started

```bash
# Clone and setup
git clone https://github.com/yourusername/portfolio.git
cd portfolio
npm install
npm run dev
```

---

## ⚡ Common Commands

| Task | Command |
|------|---------|
| Start development | `npm run dev` |
| Build production | `npm run build` |
| Preview production | `npm run preview` |
| Update dependencies | `npm update` |
| Security audit | `npm audit` |
| Deploy to Vercel | `vercel --prod` |
| Deploy to Netlify | `netlify deploy --prod` |

---

## 📝 Quick Updates

### Add Certification
**File:** `src/data/certifications.json`
```json
{
  "id": NEXT_ID,
  "title": "Cert Name",
  "issuer": "Organization",
  "date": "Month Year",
  "certificateUrl": "url",
  "verifyUrl": "url"
}
```

### Update Email/Phone
**Files:** `src/components/ContactSection.vue`, `FooterSection.vue`
- Search: `ajit.info999@gmail.com` → Replace
- Search: `+91 6205607900` → Replace

### Change Primary Color
**File:** `tailwind.config.js`
```javascript
primary: '#3B82F6'  // Change this
```

### Update Bio
**File:** `src/components/AboutSection.vue`
```vue
<p>Your bio text here...</p>
```

### Add Skill
**File:** `src/components/SkillsSection.vue`
```javascript
{ name: 'Skill Name', level: 90 }
```

### Update GitHub Username
**File:** `src/services/githubService.js`
```javascript
const GITHUB_USERNAME = 'yourusername'
```

---

## 🎨 Color Presets

Copy-paste into `tailwind.config.js`:

**Ocean Blue:**
```javascript
primary: '#0284C7'
```

**Sunset Orange:**
```javascript
primary: '#EA580C'
```

**Forest Green:**
```javascript
primary: '#059669'
```

**Royal Purple:**
```javascript
primary: '#7C3AED'
```

---

## 🔧 Troubleshooting

| Problem | Solution |
|---------|----------|
| Build fails | `rm -rf node_modules && npm install` |
| Projects not showing | Check GitHub username in `githubService.js` |
| Contact form error | Add EmailJS credentials to `.env` |
| Dark mode stuck | Clear localStorage in browser console |
| Site slow | Run `npm run build` and check bundle sizes |

---

## 📁 File → Purpose

| File | What It Does |
|------|--------------|
| `index.html` | SEO meta tags, structured data |
| `src/App.vue` | Main app structure |
| `src/components/NavBar.vue` | Navigation + theme toggle |
| `src/components/HeroSection.vue` | Landing section |
| `src/components/AboutSection.vue` | About me content |
| `src/components/SkillsSection.vue` | Technical skills |
| `src/components/ProjectsSection.vue` | GitHub projects display |
| `src/components/ContactSection.vue` | Contact form |
| `src/data/certifications.json` | Certifications data |
| `src/services/githubService.js` | GitHub API calls |
| `tailwind.config.js` | Design system (colors, fonts) |
| `vite.config.js` | Build configuration |
| `.env` | Environment variables (not in git) |

---

## 🚀 Deployment Checklist

Before deploying:

- [ ] Update domain in `index.html`, `sitemap.xml`, `robots.txt`
- [ ] Add EmailJS credentials to `.env`
- [ ] Update GitHub username
- [ ] Change name/email/phone everywhere
- [ ] Write your bio and update skills
- [ ] Add certifications
- [ ] Test: `npm run build` → `npm run preview`
- [ ] Deploy: `vercel --prod` or `netlify deploy --prod`

---

## 📖 Full Documentation

| Guide | When to Use |
|-------|-------------|
| [README.md](README.md) | Overview, quick start, setup |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Deploying to production |
| [CONTENT_UPDATE.md](CONTENT_UPDATE.md) | Updating any content |
| [UPDATE_PROJECTS.md](UPDATE_PROJECTS.md) | Managing projects |
| [THEME_CUSTOMIZATION.md](THEME_CUSTOMIZATION.md) | Changing design |
| [MAINTENANCE.md](MAINTENANCE.md) | Regular maintenance |

---

## 🎯 Maintenance Schedule

| Frequency | Tasks |
|-----------|-------|
| **Weekly** | Check broken links, monitor performance |
| **Monthly** | `npm update`, `npm audit`, add new projects |
| **Quarterly** | Content refresh, backup files |
| **Annually** | Full review, major updates |

---

## 📞 Quick Links

- **EmailJS Setup:** [emailjs.com](https://emailjs.com)
- **Vercel Deploy:** [vercel.com](https://vercel.com)
- **Netlify Deploy:** [netlify.com](https://netlify.com)
- **Google Fonts:** [fonts.google.com](https://fonts.google.com)
- **Tailwind Colors:** [uicolors.app/create](https://uicolors.app/create)
- **Lighthouse Audit:** Chrome DevTools → Lighthouse tab

---

## 💡 Pro Tips

1. **Make one change at a time** - Test after each change
2. **Always test dark mode** - After changing colors
3. **Use git commits** - Before major changes
4. **Keep backups** - Quarterly export of `dist/` folder
5. **Monitor performance** - Monthly Lighthouse audits
6. **Update  regularly** - Security patches are important

---

**Need detailed help?** Check the full guides linked above!

**Questions?** Email: ajit.info999@gmail.com
