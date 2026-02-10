<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Menu, X, Sun, Moon } from 'lucide-vue-next'

const isMenuOpen = ref(false)
const isScrolled = ref(false)
const isDark = ref(false)

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
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
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  
  // Init theme from localStorage or system preference
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav 
    class="fixed top-0 w-full z-50 transition-all duration-300"
    :class="[isScrolled ? 'bg-white/80 dark:bg-dark-background/80 backdrop-blur-md shadow-sm' : 'bg-transparent']"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex-shrink-0 cursor-pointer" @click="window.scrollTo(0, 0)">
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
              class="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              {{ item.name }}
            </a>
            
            <!-- Theme Toggle -->
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
          >
            <Menu v-if="!isMenuOpen" class="w-6 h-6" />
            <X v-else class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-show="isMenuOpen" class="md:hidden absolute w-full bg-white dark:bg-dark-surface shadow-lg">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <a 
          v-for="item in navItems" 
          :key="item.name" 
          :href="item.href"
          @click="isMenuOpen = false"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          {{ item.name }}
        </a>
      </div>
    </div>
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
