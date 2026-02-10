<script setup>
import { ExternalLink, Github, Star, GitFork } from 'lucide-vue-next'

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['openModal'])

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
    class="bg-white dark:bg-dark-surface rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group"
    @click="emit('openModal', project)"
  >
    <!-- Thumbnail placeholder -->
    <div class="h-48 bg-gradient-to-br from-primary/20 to-accent-success/20 flex items-center justify-center relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent-success/10 group-hover:scale-110 transition-transform duration-500"></div>
      <span class="text-6xl relative z-10">💻</span>
    </div>

    <div class="p-6">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
        {{ project.name }}
      </h3>
      
      <p class="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
        {{ project.description }}
      </p>

      <!-- Tech Stack -->
      <div class="flex flex-wrap gap-2 mb-4">
        <span 
          v-for="tech in (project.tech || [project.language]).filter(Boolean).slice(0, 3)" 
          :key="tech"
          :class="getTechColor(tech)"
          class="px-2 py-1 rounded text-xs font-medium"
        >
          {{ tech }}
        </span>
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center gap-4 text-sm text-gray-500">
          <span v-if="project.stargazers_count !== undefined" class="flex items-center gap-1">
            <Star class="w-4 h-4" />
            {{ project.stargazers_count }}
          </span>
          <span v-if="project.forks_count" class="flex items-center gap-1">
            <GitFork class="w-4 h-4" />
            {{ project.forks_count }}
          </span>
        </div>

        <div class="flex gap-2">
          <a 
            v-if="project.homepage" 
            :href="project.homepage" 
            target="_blank"
            @click.stop
            class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="Live Demo"
          >
            <ExternalLink class="w-4 h-4 text-primary" />
          </a>
          <a 
            v-if="project.html_url" 
            :href="project.html_url" 
            target="_blank"
            @click.stop
            class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="View on GitHub"
          >
            <Github class="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
