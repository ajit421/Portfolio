<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Menu, X, Sun, Moon, Home, User, Code2, FolderGit2, Briefcase, GraduationCap, Award, Mail } from 'lucide-vue-next'
import ThemePicker from './ThemePicker.vue'

const isMenuOpen = ref(false)
const isScrolled = ref(false)
const isDark = ref(false)
const navHidden = ref(false)
const activeSection = ref('')
let lastScrollY = 0
let ticking = false

const navItems = [
  { name: 'About', href: '#about', icon: User },
  { name: 'Skills', href: '#skills', icon: Code2 },
  { name: 'Projects', href: '#projects', icon: FolderGit2 },
  { name: 'Experience', href: '#experience', icon: Briefcase },
  { name: 'Contact', href: '#contact', icon: Mail },
]

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const toggleTheme = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
  
  // Announce to screen readers
  const announcement = isDark.value ? 'Dark mode enabled' : 'Light mode enabled'
  const liveRegion = document.createElement('div')
  liveRegion.setAttribute('role', 'status')
  liveRegion.setAttribute('aria-live', 'polite')
  liveRegion.className = 'sr-only'
  liveRegion.textContent = announcement
  document.body.appendChild(liveRegion)
  setTimeout(() => document.body.removeChild(liveRegion), 1000)
}

const handleScroll = () => {
  if (ticking) return
  ticking = true

  requestAnimationFrame(() => {
    const currentScrollY = window.scrollY
    isScrolled.value = currentScrollY > 20

    // Smart hide/show: hide on scroll down, show on scroll up
    if (currentScrollY > lastScrollY && currentScrollY > 80) {
      navHidden.value = true
    } else {
      navHidden.value = false
    }
    lastScrollY = currentScrollY
    ticking = false
  })
}

// Active section detection via IntersectionObserver
let sectionObserver = null
const setupSectionObserver = () => {
  const sections = document.querySelectorAll('section[id]')
  if (!sections.length) return

  sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
        }
      })
    },
    { rootMargin: '-20% 0px -70% 0px' }
  )

  sections.forEach(section => sectionObserver.observe(section))
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  
  // Init theme from localStorage or system preference
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }

  // Delay observer setup to ensure sections are rendered
  setTimeout(setupSectionObserver, 500)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (sectionObserver) sectionObserver.disconnect()
})
</script>

<template>
  <nav 
    class="fixed top-0 w-full z-50 transition-all duration-300"
    :class="[
      isScrolled ? 'bg-white/80 dark:bg-dark-background/80 backdrop-blur-md shadow-sm' : 'bg-transparent',
      navHidden && !isMenuOpen ? 'nav-hidden' : 'nav-visible'
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo with spin on hover -->
        <div class="flex-shrink-0 cursor-pointer logo-spin" @click="window.scrollTo({ top: 0, behavior: 'smooth' })">
          <span class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent-success">
            Ajit Kumar
          </span>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4">
            <a 
              v-for="item in navItems" 
              :key="item.name" 
              :href="item.href"
              class="nav-link-animated group flex items-center gap-1.5 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
              :class="{ 'active text-primary dark:text-primary': activeSection === item.href.slice(1) }"
              :aria-label="item.name"
            >
              <component :is="item.icon" class="nav-icon w-4 h-4" aria-hidden="true" />
              {{ item.name }}
            </a>
            
            <!-- Color Theme Picker -->
            <ThemePicker />

            <!-- Dark/Light Toggle -->
            <button 
              @click="toggleTheme"
              class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
              aria-label="Toggle Theme"
              title="Toggle Dark Mode"
            >
              <Transition name="icon-fade" mode="out-in">
                <Sun v-if="!isDark" key="sun" class="w-5 h-5 text-yellow-500" />
                <Moon v-else key="moon" class="w-5 h-5 text-blue-400" />
              </Transition>
            </button>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden flex items-center">
             <!-- Color Theme Picker Mobile -->
             <ThemePicker />

             <!-- Theme Toggle Mobile -->
             <button 
              @click="toggleTheme"
              class="p-2 mr-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
              aria-label="Toggle Theme"
              title="Toggle Dark Mode"
            >
              <Transition name="icon-fade" mode="out-in">
                <Sun v-if="!isDark" key="sun" class="w-5 h-5 text-yellow-500" />
                <Moon v-else key="moon" class="w-5 h-5 text-blue-400" />
              </Transition>
            </button>

          <button 
            @click="toggleMenu"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-primary focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <Transition name="icon-fade" mode="out-in">
              <Menu v-if="!isMenuOpen" key="menu" class="w-6 h-6" />
              <X v-else key="close" class="w-6 h-6" />
            </Transition>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu with slide-in animation -->
    <Transition name="mobile-menu">
      <div 
        v-if="isMenuOpen" 
        class="md:hidden absolute w-full bg-white/95 dark:bg-dark-surface/95 backdrop-blur-lg shadow-lg border-t border-gray-200 dark:border-gray-700"
      >
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a 
            v-for="item in navItems" 
            :key="item.name" 
            :href="item.href"
            @click="isMenuOpen = false"
            class="flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
            :class="{ 'text-primary dark:text-primary bg-primary/5': activeSection === item.href.slice(1) }"
            :aria-label="item.name"
          >
            <component :is="item.icon" class="w-5 h-5" aria-hidden="true" />
            {{ item.name }}
          </a>
        </div>
      </div>
    </Transition>

    <!-- Backdrop for mobile menu -->
    <Transition name="fade">
      <div 
        v-if="isMenuOpen" 
        class="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
        @click="isMenuOpen = false"
      ></div>
    </Transition>
  </nav>
</template>

<style scoped>
/* Icon fade transition */
.icon-fade-enter-active,
.icon-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.icon-fade-enter-from {
  opacity: 0;
  transform: rotate(-90deg) scale(0.8);
}

.icon-fade-leave-to {
  opacity: 0;
  transform: rotate(90deg) scale(0.8);
}

/* Fade backdrop */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Screen reader only class */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
