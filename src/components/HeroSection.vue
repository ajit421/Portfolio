<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-vue-next'

const roles = ["IoT Developer", "AI/ML Engineer", "Full-Stack Developer", "PCB Designer"]
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
    setTimeout(typeEffect, 2000) // Pause at end
  } else if (isDeleting.value && charIndex.value === 0) {
    isDeleting.value = false
    roleIndex.value = (roleIndex.value + 1) % roles.length
    setTimeout(typeEffect, 500) // Pause before typing next
  } else {
    setTimeout(typeEffect, isDeleting.value ? 50 : 100)
  }
}

onMounted(() => {
  setTimeout(typeEffect, 1000)
})

// Particle Options
const particlesOptions = {
  background: {
    color: {
      value: "transparent",
    },
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#3B82F6", 
    },
    links: {
      color: "#3B82F6",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: false,
      speed: 1,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      random: true,
      value: 5,
    },
  },
  detectRetina: true,
}
</script>

<template>
  <section class="relative h-screen flex items-center justify-center overflow-hidden">
    <!-- Particles Background -->
    <vue-particles
      id="tsparticles"
      class="absolute inset-0 -z-10"
      :options="particlesOptions"
    />

    <!-- Content -->
    <div class="text-center z-10 px-4">
      <h2 class="text-lg md:text-xl text-primary font-bold mb-2 animate-fade-in-up">
        Hello, I'm
      </h2>
      <h1 class="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 animate-fade-in">
        Ajit Kumar
      </h1>
      
      <div class="h-10 md:h-12 mb-6">
        <span class="text-2xl md:text-4xl font-mono text-gray-700 dark:text-gray-300">
          {{ currentRole }}<span class="animate-pulse">|</span>
        </span>
      </div>

      <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8 text-lg">
        Daily learner. Practical explorer. Technology builder.
      </p>

      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
        <a href="#projects" class="px-8 py-3 bg-primary text-white rounded-full hover:bg-blue-700 transition-colors font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1">
          View Projects
        </a>
        <a href="/resume.pdf" class="px-8 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-full hover:border-primary dark:hover:border-primary hover:text-primary dark:hover:text-primary transition-all font-medium">
          Download Resume
        </a>
        <a href="#contact" class="px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full hover:opacity-90 transition-opacity font-medium">
          Contact Me
        </a>
      </div>

      <!-- Social Links -->
      <div class="flex gap-6 justify-center">
        <a href="https://github.com" target="_blank" class="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
          <Github class="w-6 h-6" />
        </a>
        <a href="https://linkedin.com" target="_blank" class="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
          <Linkedin class="w-6 h-6" />
        </a>
        <a href="mailto:ajit@example.com" class="text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors">
          <Mail class="w-6 h-6" />
        </a>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-8 animate-bounce">
      <ChevronDown class="w-8 h-8 text-gray-400" />
    </div>
  </section>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 1s ease-out;
}
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
