<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { Github, Linkedin, Mail, ChevronDown, ArrowRight, DownloadCloud, CheckCircle, Sparkles, MapPin } from 'lucide-vue-next'
import { useRipple } from '../composables/useRipple'

const { createRipple } = useRipple()

// --- Typing Effect ---
const roles = ["IoT Developer", "AI/ML Engineer", "PCB Design Software Developer"]
const currentRole = ref('')
const roleIndex = ref(0)
const charIndex = ref(0)
const isDeleting = ref(false)

const typeEffect = () => {
  const current = roles[roleIndex.value]
  if (isDeleting.value) {
    currentRole.value = current.substring(0, charIndex.value - 1)
    charIndex.value--
  } else {
    currentRole.value = current.substring(0, charIndex.value + 1)
    charIndex.value++
  }
  if (!isDeleting.value && charIndex.value === current.length) {
    isDeleting.value = true
    setTimeout(typeEffect, 2000)
  } else if (isDeleting.value && charIndex.value === 0) {
    isDeleting.value = false
    roleIndex.value = (roleIndex.value + 1) % roles.length
    setTimeout(typeEffect, 500)
  } else {
    setTimeout(typeEffect, isDeleting.value ? 50 : 100)
  }
}


onMounted(async () => {
  setTimeout(typeEffect, 1000)
  await nextTick()

  // Staggered entrance animation
  const items = document.querySelectorAll('.hero-animate-item')
  if (items.length) {
    const gsap = (await import('gsap')).default
    gsap.from(items, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      delay: 0.3,
    })
  }
})
</script>

<template>
  <section class="relative h-screen flex items-center justify-center overflow-hidden section-bg-hero">
    <!-- CSS Background -->
    <div class="absolute inset-0 -z-10 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-transparent"
      aria-hidden="true"></div>

    <!-- Content -->
    <div class="text-center z-10 px-4">
      <!-- Status Badges -->
      <div class="hero-animate-item flex flex-wrap justify-center gap-3 mb-6">
        <span
          class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 status-glow">
          <CheckCircle class="w-3.5 h-3.5" aria-hidden="true" />
          Available for Work
        </span>
        <span
          class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400">
          <Sparkles class="w-3.5 h-3.5 icon-float" aria-hidden="true" />
          Currently Learning 3D Modeling
        </span>
        <span
          class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
          <MapPin class="w-3.5 h-3.5" aria-hidden="true" />
          Bihar, India
        </span>
      </div>

      <h2 class="hero-animate-item text-lg md:text-xl text-primary font-bold mb-2">
        Hello, I'm
      </h2>
      <h1
        class="hero-animate-item text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
        Ajit Kumar
      </h1>

      <div class="hero-animate-item h-10 md:h-12 mb-6">
        <span class="text-2xl md:text-4xl font-mono text-gray-700 dark:text-gray-300">
          {{ currentRole }}<span class="animate-pulse">|</span>
        </span>
      </div>

      <p class="hero-animate-item text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8 text-lg">
        Daily learner. Practical explorer. Technology builder.
      </p>

      <div class="hero-animate-item flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
        <a href="#projects" class="btn btn-primary btn-pill btn-icon-animated group" @click="createRipple($event)"
          aria-label="View my projects">
          <span class="btn-text">View Projects</span>
          <ArrowRight class="btn-icon-el w-4 h-4" aria-hidden="true" />
        </a>
        <a href="https://res.cloudinary.com/dsk6zd1rj/image/upload/v1770879516/AJIT_KUMAR_ej5fu3.pdf" target="_blank"
          rel="noopener noreferrer" class="btn btn-download btn-pill btn-icon-animated download-arrow-trigger group"
          @click="createRipple($event)" aria-label="Download my resume">
          <DownloadCloud class="w-4 h-4 download-arrow" aria-hidden="true" />
          <span class="btn-text">Download Resume</span>
        </a>
        <a href="#contact" class="btn btn-neon btn-pill" @click="createRipple($event)" aria-label="Contact me">
          <Mail class="w-4 h-4" aria-hidden="true" />
          Contact Me
        </a>
      </div>

      <!-- Social Links -->
      <div class="hero-animate-item flex gap-6 justify-center">
        <a href="https://github.com/ajit421" target="_blank"
          class="social-icon-github text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300 p-2"
          aria-label="GitHub Profile">
          <Github class="w-6 h-6" />
        </a>
        <a href="https://linkedin.com/in/ajit7900" target="_blank"
          class="social-icon-linkedin text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors duration-300 p-2"
          aria-label="LinkedIn Profile">
          <Linkedin class="w-6 h-6" />
        </a>
        <a href="mailto:ajit.info999@gmail.com"
          class="social-icon-mail text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors duration-300 p-2"
          aria-label="Send Email">
          <Mail class="w-6 h-6" />
        </a>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-8 animate-bounce">
      <ChevronDown class="w-8 h-8 text-gray-400" aria-hidden="true" />
    </div>
  </section>
</template>
