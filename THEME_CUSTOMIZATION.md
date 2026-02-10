# 🎨 Theme Customization Guide

Complete guide to customizing colors, fonts, and animations in your portfolio.

## 🎨 Color Schemes

### Tailwind Configuration

**File:** `tailwind.config.js`

#### Primary Color
```javascript
colors: {
  primary: '#3B82F6',  // Change this blue
}
```

**Color Options:**
- Red: `#EF4444`
- Green: `#10B981`
- Purple: `#8B5CF6`
- Orange: `#F97316`
- Pink: `#EC4899`

#### Accent Colors
```javascript
accent: {
  success: '#10B981',  // Green
  warning: '#F59E0B',  // Orange
  error: '#EF4444',    // Red
}
```

#### Dark Mode Colors
```javascript
dark: {
  background: '#0F172A',  // Dark navy
  surface: '#1E293B',     // Lighter navy
  border: '#334155',      // Border color
}
```

### Global Color Variables

**File:** `src/style.css`

Add custom CSS variables:
```css
:root {
  --color-primary: #3B82F6;
  --color-accent: #10B981;
}

.dark {
  --color-primary: #60A5FA;
  --color-accent: #34D399;
}
```

## 🖋️ Fonts

### Changing Font Family

**File:** `index.html`

1. **Find Google Fonts:**
   - Visit [Google Fonts](https://fonts.google.com/)
   - Select your font
   - Copy the `<link>` code

2. **Update in index.html:**
   ```html
   <!-- Replace Inter with your font -->
   <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
   ```

3. **Update Tailwind Config:**
   **File:** `tailwind.config.js`
   ```javascript
   fontFamily: {
     sans: ['Poppins', 'sans-serif'],  // Change Inter to your font
   }
   ```

### Font Combinations

**Professional:**
- Headings: `Montserrat` + Body: `Open Sans`
- Headings: `Raleway` + Body: `Lato`

**Modern:**
- Headings: `Poppins` + Body: `Inter`
- Headings: `Space Grotesk` + Body: `DM Sans`

**Tech/Code:**
- Headings: `JetBrains Mono` + Body: `IBM Plex Sans`

### Font Weights
Available weights in config:
```javascript
fontWeight: {
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
}
```

## ✨ Animations

### Transition Speed

**File:** `src/style.css`

Change global transition duration:
```css
* {
  transition-duration: 300ms;  /* Change to 200ms, 500ms, etc. */
}
```

### Disabling Animations

For users who prefer reduced motion:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    transition-duration: 0.01ms !important;
  }
}
```

### Component Animations

#### NavBar Scroll Effect
**File:** `src/components/NavBar.vue`
```vue
class="transition-all duration-300"  <!-- Change duration -->
```

#### Hero Typing Speed
**File:** `src/components/HeroSection.vue`
```javascript
const typingSpeed = 100  // Change milliseconds between characters
const deletingSpeed = 50
const pauseDuration = 2000  // Pause before deleting
```

#### Card Hover Effects
**Files:** `ProjectCard.vue`, `ExperienceSection.vue`, etc.
```vue
class="hover:scale-105 transition-transform"  <!-- Adjust scale -->
```

### Custom Animations

Add to component's `<style>` section:
```css
@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.slide-in {
  animation: slideIn 0.5s ease-out;
}
```

## 🎭 Theme Toggle Customization

### Icon Colors

**File:** `src/components/NavBar.vue`

```vue
<Sun class="w-5 h-5 text-yellow-500" />  <!-- Change color -->
<Moon class="w-5 h-5 text-blue-400" />
```

### Icon Animation
```css
.icon-fade-enter-from {
  transform: rotate(-90deg) scale(0.8);  /* Adjust rotation/scale */
}
```

## 🌈 Gradient Customization

### Hero Gradient
**File:** `src/components/HeroSection.vue`
```vue
class="bg-gradient-to-r from-primary to-accent-success"
<!-- Change to: -->
class="bg-gradient-to-r from-purple-500 to-pink-500"
```

### Text Gradients
```vue
class="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500"
```

## 🎯 Preset Themes

### Theme 1: Ocean Blue
```javascript
// tailwind.config.js
primary: '#0284C7',
accent: { success: '#0891B2' },
dark: { background: '#082F49' }
```

### Theme 2: Sunset Orange
```javascript
primary: '#EA580C',
accent: { success: '#F97316' },
dark: { background: '#431407' }
```

### Theme 3: Forest Green
```javascript
primary: '#059669',
accent: { success: '#10B981' },
dark: { background: '#064E3B' }
```

### Theme 4: Royal Purple
```javascript
primary: '#7C3AED',
accent: { success: '#8B5CF6' },
dark: { background: '#3B0764' }
```

## 📐 Spacing & Layout

### Border Radius

**File:** `tailwind.config.js`
```javascript
borderRadius: {
  'sm': '0.25rem',
  DEFAULT: '0.5rem',
  'lg': '1rem',     // Card corners
  'xl': '1.5rem',   // Modal corners
  'full': '9999px', // Buttons
}
```

### Container Widths
```javascript
maxWidth: {
  '7xl': '80rem',  // Max container width
}
```

## 🔍 Component-Specific Customization

### Project Cards
**File:** `src/components/ProjectCard.vue`

**Shadow:**
```vue
class="shadow-lg hover:shadow-2xl"  <!-- Adjust shadow intensity -->
```

**Border:**
```vue
class="border-2 border-gray-200 dark:border-gray-700"
```

### Skill Progress Bars
**File:** `src/components/SkillsSection.vue`

**Bar Height:**
```vue
class="h-2"  <!-- Change to h-3, h-4 for thicker bars -->
```

**Bar Color:**
```vue
class="bg-primary"  <!-- Change to any color -->
```

## 💡 Quick Customization Checklist

- [ ] Choose primary color
- [ ] Set accent colors
- [ ] Update dark mode colors
- [ ] Change fonts (headings + body)
- [ ] Adjust animation speeds
- [ ] Customize button styles
- [ ] Update gradient colors
- [ ] Test in light mode
- [ ] Test in dark mode
- [ ] Test on mobile

## 🧪 Testing Changes

```bash
# Start dev server
npm run dev

# Toggle dark/light mode to see changes
# Test on different screen sizes
# Verify color contrast (WCAG AA standard)
```

## 🎨 Design Tools

**Color Palette Generators:**
- [Coolors.co](https://coolors.co/)
- [Tailwind Color Generator](https://uicolors.app/create)

**Contrast Checker:**
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

**Font Pairing:**
- [FontPair](https://www.fontpair.co/)
- [Google Font Pairings](https://www.fontpair.co/all)

---

**Pro Tip:** Make one change at a time and preview to ensure everything looks good together. Always test both light and dark modes!

Need help with content? See [CONTENT_UPDATE.md](CONTENT_UPDATE.md).
