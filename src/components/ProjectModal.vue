<script setup>
import { onMounted, onUnmounted } from 'vue'
import { X, ExternalLink, Github, Star, GitFork } from 'lucide-vue-next'

const props = defineProps({
  project: {
    type: Object,
    required: true
  },
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const handleEscape = (e) => {
  if (e.key === 'Escape') emit('close')
}

// ✅ MAGIC FUNCTION: Ye Array ko todkar alag-alag karta hai
const getCategories = (category) => {
  if (!category) return []
  // Agar list hai (["IoT", "PCB"]) toh waisa hi return karo
  // Agar akela hai ("IoT") toh usse list bana do
  return Array.isArray(category) ? category : [category]
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
  document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = 'auto'
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-enhanced">
      <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        @click="emit('close')">
        <Transition name="modal-content" appear>
          <div
            class="bg-white dark:bg-dark-surface rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            @click.stop>
            <!-- Header -->
            <div
              class="sticky top-0 bg-white dark:bg-dark-surface border-b border-gray-200 dark:border-gray-700 p-6 flex items-start justify-between">
              <div class="flex-1">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {{ project.name }}
                </h2>
                <div class="flex items-center gap-4 text-sm text-gray-500">
                  <span v-if="project.stargazers_count !== undefined" class="flex items-center gap-1">
                    <Star class="w-4 h-4" />
                    {{ project.stargazers_count }} stars
                  </span>
                  <span v-if="project.forks_count" class="flex items-center gap-1">
                    <GitFork class="w-4 h-4" />
                    {{ project.forks_count }} forks
                  </span>
                  <span v-if="project.language" class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                    {{ project.language }}
                  </span>
                </div>
              </div>
              <button @click="emit('close')"
                class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all hover:rotate-90 duration-300">
                <X class="w-5 h-5" />
              </button>
            </div>

            <!-- Content -->
            <div class="p-6 space-y-6">
              <!-- Description -->
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Description</h3>
                <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {{ project.description }}
                </p>
              </div>

              <!-- Tech Stack -->
              <div v-if="project.tech">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Tech Stack</h3>
                <div class="flex flex-wrap gap-2">
                  <span v-for="tech in project.tech" :key="tech"
                    class="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors">
                    {{ tech }}
                  </span>
                </div>
              </div>

              <!-- Category -->
              <div v-if="project.category">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Category</h3>
                <div class="flex flex-wrap gap-2">
                  <span v-for="cat in getCategories(project.category)" :key="cat"
                    class="px-4 py-2 bg-accent-success/10 text-accent-success rounded-lg font-medium">
                    {{ cat }}
                  </span>
                </div>
              </div>

              <!-- Links -->
              <div class="flex gap-4 pt-4">
                <a v-if="project.homepage" :href="project.homepage" target="_blank" class="btn btn-projects group"
                  aria-label="Live Demo">
                  <ExternalLink class="w-5 h-5 icon-arrow-slide" aria-hidden="true" />
                  <span>Live Demo</span>
                </a>
                <a v-if="project.html_url" :href="project.html_url" target="_blank" class="btn btn-glass"
                  aria-label="View Code on GitHub">
                  <Github class="w-5 h-5" aria-hidden="true" />
                  <span>View Code</span>
                </a>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
