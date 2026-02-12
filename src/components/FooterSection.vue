<script setup>
import { Github, Linkedin, Mail, ArrowUp, X, MessageCircle } from 'lucide-vue-next'

const currentYear = new Date().getFullYear()

const quickLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' }
]

const socialLinks = [
  {
    name: 'GitHub',
    icon: Github,
    href: 'https://github.com/ajit421',
    socialClass: 'social-icon-github'
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://linkedin.com/in/ajit7900',
    socialClass: 'social-icon-linkedin'
  },
  {
    name: 'Email',
    icon: Mail,
    href: 'mailto:ajit.info999@gmail.com',
    socialClass: 'social-icon-mail'
  },
  {
    name: 'X',
    icon: X,
    href: 'https://x.com/blackgold_79',
    socialClass: 'social-icon-x'
  },
  {
    name: 'Whatsapp',
    icon: MessageCircle,
    href: 'https://wa.me/+916205607900',
    socialClass: 'social-icon-whatsapp'
  }
]

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<template>
  <footer class="bg-gray-900 dark:bg-black text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <!-- About Column -->
        <div>
          <h3 class="text-xl font-bold mb-4">Ajit Kumar</h3>
          <p class="text-gray-400 text-sm leading-relaxed">
            IoT & AI/ML Developer passionate about building intelligent systems and innovative solutions.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-xl font-bold mb-4">Quick Links</h3>
          <ul class="space-y-2">
            <li v-for="link in quickLinks" :key="link.name">
              <a
                :href="link.href"
                class="text-gray-400 hover:text-primary hover:translate-x-1 transition-all duration-200 text-sm inline-block"
              >
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Social Links -->
        <div>
          <h3 class="text-xl font-bold mb-4">Connect</h3>
          <div class="flex gap-4">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.href"
              target="_blank"
              :title="social.name"
              :aria-label="social.name"
              :class="['p-3 bg-gray-800 dark:bg-gray-900 rounded-lg hover:bg-primary hover:scale-110 hover:-translate-y-1 transition-all duration-300', social.socialClass]"
            >
              <component :is="social.icon" class="w-5 h-5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="pt-8 border-t border-gray-800 dark:border-gray-700 flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-gray-400 text-sm">
          Built with <span class="text-red-500">❤️</span> by Ajit Kumar | © {{ currentYear }}
        </p>
        
        <!-- Back to Top Button -->
        <button
          @click="scrollToTop"
          class="btn btn-glass btn-sm group"
          aria-label="Back to top"
        >
          <ArrowUp class="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-200" />
          Back to Top
        </button>
      </div>
    </div>
  </footer>
</template>
