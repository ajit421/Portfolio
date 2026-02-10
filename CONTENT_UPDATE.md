# 📝 Content Updates Guide

This guide covers updating all content in your portfolio without touching code.

## 📧 Contact Information

### Email
**File:** `src/components/ContactSection.vue` + `src/components/FooterSection.vue`

1. Search for `ajit.info999@gmail.com`
2. Replace with your email
3. Update in both files

### Phone
**File:** `src/components/ContactSection.vue`

1. Find `+91 6205607900`
2. Replace with your number
3. Format: `+[country code][number]`

### Social Links
**Files:** `src/components/ContactSection.vue`, `src/components/FooterSection.vue`

Update GitHub, LinkedIn URLs:
```javascript
{
  icon: Github,
  label: 'GitHub',
  value: 'github.com/YOUR_USERNAME',  // Change this
  link: 'https://github.com/YOUR_USERNAME'  // And this
}
```

## 👤 About Section

**File:** `src/components/AboutSection.vue`

### Bio Text
Find and update:
```vue
<p>I'm a passionate IoT & AI/ML Developer...</p>
```

### Stats/Counters
```javascript
const stats = [
  { label: 'Projects Completed', value: 50, icon: Code },  // Update value
  { label: 'Years Experience', value: 3, icon: Award },
  { label: 'Technologies', value: 20, icon: Zap }
]
```

### Achievements
```javascript
const achievements = [
  {
    title: 'Your Achievement',  // Update these
    description: 'Description',
    icon: Trophy
  }
]
```

## 🛠️ Skills Section

**File:** `src/components/SkillsSection.vue`

### Adding New Skill Category
```javascript
const skillCategories = [
  {
    name: 'Your New Category',
    skills: [
      { name: 'Skill Name', level: 90 }  // 0-100
    ]
  }
]
```

### Updating Proficiency Levels
Change the `level` value (0-100):
- 90-100: Expert
- 70-89: Advanced
- 50-69: Intermediate
- 0-49: Beginner

## 💼 Experience Section

**File:** `src/components/ExperienceSection.vue`

### Adding New Job
```javascript
{
  id: 4,
  title: 'Your Job Title',
  company: 'Company Name',
  location: 'City, Country',
  period: 'Month Year - Present',
  type: 'Full-time',  // Full-time, Part-time, Contract
  description: 'Brief role description',
  responsibilities: [
    'Key responsibility 1',
    'Key responsibility 2'
  ],
  technologies: ['Tech1', 'Tech2']
}
```

### Updating Existing Experience
1. Find the job by `company` name
2. Update any field
3. Keep `id` unique

## 🎓 Education Section

**File:** `src/components/EducationSection.vue`

### Adding Degree
```javascript
{
  id: 4,
  degree: 'Your Degree',
  field: 'Field of Study',
  institution: 'University Name',
  location: 'City, Country',
  period: 'Year - Year',
  grade: 'CGPA/Percentage',  // Optional
  achievements: [
    'Achievement 1',
    'Achievement 2'
  ]
}
```

## 🏆 Certifications

**File:** `src/data/certifications.json`

See [README.md](README.md#-how-to-add-certifications) for detailed instructions.

**Quick Add:**
```json
{
  "id": 5,
  "title": "Certification Name",
  "issuer": "Organization",
  "date": "Month Year",
  "score": "Score (optional)",
  "certificateUrl": "Link to certificate",
  "verifyUrl": "Verification link",
  "category": "Category",
  "description": "What you learned"
}
```

## 🎨 Hero Section

**File:** `src/components/HeroSection.vue`

### Name & Title
```vue
<h1>Your Name</h1>
<p>Your Professional Title</p>
```

### Tagline/Description
```vue
<p class="text-lg">
  Your tagline or description
</p>
```

### Call-to-Action Buttons
```javascript
const buttons = [
  { text: 'View Projects', href: '#projects', primary: true },
  { text: 'Contact Me', href: '#contact', primary: false }
]
```

## 🎯 Navigation

**File:** `src/components/NavBar.vue`

### Adding/Removing Menu Items
```javascript
const navItems = [
  { name: 'About', href: '#about' },
  { name: 'New Section', href: '#new-section' },  // Add
  // Remove unwanted items
]
```

### Logo Text
```vue
<span>Your Name</span>  // Update this
```

## 📝 Meta Tags & SEO

**File:** `index.html`

### Page Title
```html
<title>Your Name | Portfolio</title>
```

### Description
```html
<meta name="description" content="Your portfolio description" />
```

### Keywords
```html
<meta name="keywords" content="Your, Keywords, Here" />
```

### Social Media Cards
```html
<!-- Update these -->
<meta property="og:title" content="Your Name | Portfolio" />
<meta property="og:description" content="Your description" />
<meta property="og:image" content="https://yoursite.com/preview.jpg" />
```

## 🔧 Quick Update Checklist

When creating your portfolio:

- [ ] Update name everywhere (NavBar, Hero, Footer, Meta tags)
- [ ] Change email, phone, social links
- [ ] Write your bio in About section
- [ ] Update skills and proficiency levels
- [ ] Add your work experience
- [ ] Add education details
- [ ] Update certifications (JSON file)
- [ ] Configure EmailJS for contact form
- [ ] Update domain in `index.html`, `sitemap.xml`, `robots.txt`
- [ ] Test all sections work correctly

## 🚀 Testing Changes

After making updates:

```bash
# 1. Start dev server
npm run dev

# 2. Check your changes at http://localhost:3000

# 3. Test all sections scroll correctly

# 4. Test contact form (needs EmailJS setup)

# 5. Test dark/light mode

# 6. Build for production
npm run build
```

---

**Pro Tip:** Make changes incrementally and test after each change to catch errors early.

Need help with deployment? See [DEPLOYMENT.md](DEPLOYMENT.md).
