<script setup>
import { ref } from 'vue'
import { ExternalLink, Github, Star, GitFork } from 'lucide-vue-next'
import { use3DTilt } from '../three/use3DTilt'

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['openModal'])
const cardRef = ref(null)

// Apply 3D tilt effect
use3DTilt(cardRef, {
  maxTilt: 6,
  scale: 1.03,
  speed: 400,
  glareOpacity: 0.12,
})

const getTechColor = (tech) => {
  const colors = {
    'Python': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    'JavaScript': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    'Flask': 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300',
    'TensorFlow': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
    'default': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
  }
  return colors[tech] || colors['default']
}
</script>

<template>
  <div 
    ref="cardRef"
    class="project-card group"
    style="transform-style: preserve-3d;"
    @click="emit('openModal', project)"
  >
    <!-- Card Image & Overlay -->
    <div class="card-image">
      <img v-if="project.image" :src="project.image" :alt="project.name" loading="lazy">
      <div v-else class="h-full w-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
        <span class="text-6xl">💻</span>
      </div>

      <!-- Hover Reveal Overlay -->
      <div class="card-overlay">
        <div class="overlay-content">
          <h3 class="text-white font-bold text-xl mb-1">{{ project.name }}</h3>
          <p class="text-gray-200 text-sm mb-4 line-clamp-2">{{ project.description }}</p>
          
          <div class="card-actions">
            <a 
              v-if="project.homepage" 
              :href="project.homepage" 
              target="_blank"
              @click.stop
              class="btn-glass"
              aria-label="Live Demo"
            >
              <ExternalLink class="w-4 h-4" /> Live Demo
            </a>
            <a 
              v-if="project.html_url" 
              :href="project.html_url" 
              target="_blank"
              @click.stop
              class="btn-glass"
              aria-label="View Code"
            >
              <Github class="w-4 h-4" /> Code
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Card Footer -->
    <div class="card-footer">
      <div class="tech-tags">
        <span 
          v-for="tech in (project.tech || [project.language]).filter(Boolean).slice(0, 3)" 
          :key="tech"
          class="tag"
        >
          {{ tech }}
        </span>
      </div>
      
      <div class="card-stats">
        <span v-if="project.stargazers_count !== undefined" class="flex items-center gap-1">
          <Star class="w-3 h-3 text-yellow-500" fill="currentColor" />
          {{ project.stargazers_count }}
        </span>
        <span v-if="project.forks_count" class="flex items-center gap-1">
          <GitFork class="w-3 h-3" />
          {{ project.forks_count }}
        </span>
      </div>
    </div>
  </div>
</template>
