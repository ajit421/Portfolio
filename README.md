# Ajit Kumar - Portfolio Website 🚀

[![License: Private](https://img.shields.io/badge/License-Private-red.svg)](LICENSE)
[![Built with Vue](https://img.shields.io/badge/Built%20with-Vue%203-4FC08D.svg)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-06B6D4.svg)](https://tailwindcss.com/)

Modern, responsive portfolio website showcasing expertise in **IoT**, **AI/ML**, and **Full-Stack Development**.

**Live Demo:** [Your Portfolio URL](#) | **Docs:** [Full Documentation](#documentation)

---

## ✨ Features

- 🎨 **Dark/Light Mode** - Smooth theme transitions with OS preference detection
- 🎨 **Premium UI** - Glassmorphism, Neumorphism, and specialized card designs
- 🧊 **3D Visuals** - Interactive 3D elements using Three.js (Hero, Skills, Contact)
- 🎭 **Advanced Animations** - GSAP-powered scroll reveals and timeline effects
- 📱 **Fully Responsive** - Mobile-first design, works on all devices
- 🚀 **GitHub Integration** - Auto-fetches latest repositories via API
- 📧 **Contact Form** - EmailJS integration with real-time validation
- 🎯 **SEO Optimized** - Meta tags, structured data, sitemap
- ⚡ **Lightning Fast** - Optimized build with code splitting (< 500KB)
- ♿ **Accessible** - WCAG AA compliant, screen reader friendly
- 🔒 **Secure** - CSP headers, XSS protection, security headers

---

## 🛠️ Technology Stack

**Frontend:**
- [Vue 3](https://vuejs.org/) - Progressive JavaScript framework (Composition API)
- [Vite](https://vitejs.dev/) - Next-generation build tool
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Three.js](https://threejs.org/) - 3D Graphics
- [GSAP](https://greensock.com/gsap/) - Advanced Animations

**Integrations:**
- [EmailJS](https://www.emailjs.com/) - Contact form backend
- [GitHub API](https://api.github.com/) - Live project data
- [Lucide Icons](https://lucide.dev/) - Beautiful icon library

**Deployment:**
- [Vercel](https://vercel.com/) / [Netlify](https://www.netlify.com/) - Serverless hosting

---

## 📂 Project Structure

```
d:/Code/Portfolio/
├── public/                 # Static assets
│   ├── robots.txt         # Search engine directives
│   └── sitemap.xml        # SEO sitemap
├── src/
│   ├── components/        # Vue components
│   │   ├── NavBar.vue              # Navigation + theme toggle
│   │   ├── HeroSection.vue         # Landing section
│   │   ├── AboutSection.vue        # About me
│   │   ├── SkillsSection.vue       # Technical skills
│   │   ├── ProjectsSection.vue     # GitHub projects
│   │   ├── ProjectCard.vue         # Project card component
│   │   ├── ProjectModal.vue        # Project details modal
│   │   ├── ExperienceSection.vue   # Work experience
│   │   ├── EducationSection.vue    # Education timeline
│   │   ├── CertificationsSection.vue # Certifications
│   │   ├── ContactSection.vue      # Contact form
│   │   └── FooterSection.vue       # Footer
│   ├── services/
│   │   └── githubService.js        # GitHub API integration
│   ├── data/
│   │   ├── projectsFallback.json   # Featured projects
│   │   └── certifications.json     # Certifications data
│   ├── App.vue            # Root component
│   ├── main.js            # Application entry
│   └── style.css          # Global styles + transitions
├── index.html             # HTML entry (SEO meta tags)
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind design tokens
├── package.json           # Dependencies
├── .env.example           # Environment variables template
├── vercel.json            # Vercel deployment config
├── netlify.toml           # Netlify deployment config
├── DEPLOYMENT.md          # 📖 Deployment guide
├── MAINTENANCE.md         # 🛠️ Maintenance guide
├── CONTENT_UPDATE.md      # 📝 Content update guide
├── UPDATE_PROJECTS.md     # 💼 Projects update guide
└── THEME_CUSTOMIZATION.md # 🎨 Theme customization guide
```

---

## ⚡ Quick Start

### Prerequisites
- Node.js v16+ ([Download](https://nodejs.org/))
- npm or yarn

### Installation

```bash
# 1. Clone repository
git clone https://github.com/yourusername/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env

# 4. Add EmailJS credentials to .env (see EmailJS Setup below)

# 5. Start development server
npm run dev

# 6. Open browser
# → http://localhost:3000
```

### Build for Production

```bash
# Build optimized production bundle
npm run build

# Preview production build
npm run preview
```

---

## 📧 EmailJS Setup (Contact Form)

To enable the contact form:

1. **Create EmailJS Account**
   - Sign up at [emailjs.com](https://www.emailjs.com/)
   - Verify your email

2. **Add Email Service**
   - Go to Email Services
   - Add your email provider (Gmail, Outlook, etc.)

3. **Create Email Template**
   - Go to Email Templates
   - Create new template with variables:
     - `{{from_name}}`
     - `{{from_email}}`
     - `{{subject}}`
     - `{{message}}`

4. **Get Credentials**
   - Copy Service ID, Template ID, and Public Key

5. **Configure Environment**
   - Add to `.env` file:
     ```bash
     VITE_EMAILJS_SERVICE_ID=your_service_id
     VITE_EMAILJS_TEMPLATE_ID=your_template_id
     VITE_EMAILJS_PUBLIC_KEY=your_public_key
     ```

6. **Restart Dev Server**
   ```bash
   npm run dev
   ```

> **Note**: Without EmailJS configuration, the contact form will show an error message. Users can still contact you via direct email/phone links.

---

## 📜 How to Add Certifications

To add new certifications **without modifying code**:

1. **Open the data file**: `src/data/certifications.json`

2. **Add a new certification**:
   ```json
   {
     "id": 2,
     "title": "Your Certification Name",
     "issuer": "Issuing Organization",
     "date": "Month Year",
     "score": "95/100",
     "certificateUrl": "https://link-to-certificate.com",
     "verifyUrl": "https://verify-link.com",
     "category": "Category Name",
     "description": "Brief description of the certification"
   }
   ```

3. **Save the file** - Changes will automatically appear in your portfolio!

> **Note**: Make sure each entry has a unique `id` number.

---

## 🎯 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (port 3000) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build (port 4173) |

---

## 📖 Documentation

| Guide | Description |
|-------|-------------|
| [DEPLOYMENT.md](DEPLOYMENT.md) | Deploy to Vercel, Netlify, or GitHub Pages |
| [MAINTENANCE.md](MAINTENANCE.md) | Regular maintenance, security, performance |
| [CONTENT_UPDATE.md](CONTENT_UPDATE.md) | Update all portfolio content |
| [UPDATE_PROJECTS.md](UPDATE_PROJECTS.md) | Manage GitHub projects display |
| [THEME_CUSTOMIZATION.md](THEME_CUSTOMIZATION.md) | Customize colors, fonts, animations |

---

## 🎨 Design System

**Colors:**
- Primary: `#3B82F6` (Blue)
- Accent: `#10B981` (Green)
- Dark Background: `#0F172A`

**Typography:**
- Font Family: Inter
- Weights: 300, 400, 500, 600, 700, 800

**Transitions:**
- Duration: 300ms
- Easing: ease-in-out

---

## 🔒 Security

- ✅ No hardcoded secrets (environment variables)
- ✅ Content Security Policy (CSP) headers
- ✅ XSS protection via Vue escaping
- ✅ Security headers (X-Frame-Options, X-Content-Type-Options)
- ✅ HTTPS enforced (via hosting platform)

**Security Headers configured in:**
- `vercel.json`
- `netlify.toml`
- `index.html` (CSP)

---

## 🚀 Deployment

**Quick Deploy to Vercel:**
```bash
npm install -g vercel
vercel login
vercel --prod
```

**Quick Deploy to Netlify:**
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for complete deployment instructions including GitHub Pages, custom domains, and environment variable setup.

---

## 📊 Performance

**Lighthouse Targets:**
- ✅ Performance: 90+
- ✅ Accessibility: 95+
- ✅ Best Practices: 95+
- ✅ SEO: 100

**Bundle Size:**
- Main: ~274KB
- Vendor: Split into chunks
- Total: < 500KB (gzipped)

---

## 🤝 Contributing

This is a personal portfolio, but suggestions are welcome!

1. Fork the repository
2. Create feature branch (`git checkout -b feature/improvement`)
3. Commit changes (`git commit -m 'Add improvement'`)
4. Push to branch (`git push origin feature/improvement`)
5. Open Pull Request

---

## 📝 License

Private Repository. © 2026 Ajit Kumar. All rights reserved.

---

## 📞 Contact

**Ajit Kumar**
- Email: [ajit.info999@gmail.com](mailto:ajit.info999@gmail.com)
- GitHub: [@ajit421](https://github.com/ajit421)
- LinkedIn: [ajit7900](https://linkedin.com/in/ajit7900)
- Portfolio: [Your Live URL](#)

---

## 🙏 Acknowledgments

- Vue.js team for the amazing framework
- Tailwind CSS for the utility-first approach
- EmailJS for contact form backend
- GitHub for hosting repositories
- Vercel/Netlify for easy deployment

---

**Built with ❤️ using Vue 3, Vite, and Tailwind CSS**
#   P o r t f o l i o 
 
 