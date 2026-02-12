<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { Search } from 'lucide-vue-next'
// import { fetchGitHubRepos } from '../services/githubService'
import fallbackProjects from '../data/projectsFallback.json'
import ProjectCard from './ProjectCard.vue'
import ProjectModal from './ProjectModal.vue'
import { useScrollAnimation } from '../composables/useScrollAnimation'

const { slideInLeft, staggerCards } = useScrollAnimation()

const categories = ['All', 'IoT', 'AI/ML', 'Web', 'PCB', 'Automation']
const activeCategory = ref('All')
const searchQuery = ref('')
const projects = ref([])
const isLoading = ref(true)
const error = ref(null)
const displayCount = ref(6)
const selectedProject = ref(null)
const isModalOpen = ref(false)

// const mergeProjects = (githubRepos, fallback) => {
//   const fallbackMap = new Map(fallback.map(p => [p.name.toLowerCase(), p]))
//   const merged = []
//   merged.push(...fallback)

//   githubRepos.forEach(repo => {
//     const repoNameLower = repo.name.toLowerCase()
//     if (!fallbackMap.has(repoNameLower)) {
//       let category = 'Web'
//       if (repo.topics.includes('iot') || repo.topics.includes('hardware')) category = 'IoT'
//       else if (repo.topics.includes('ml') || repo.topics.includes('ai')) category = 'AI/ML'
//       else if (repo.topics.includes('pcb')) category = 'PCB'
//       else if (repo.topics.includes('automation')) category = 'Automation'
//       else if (repo.language === 'Python') category = 'AI/ML'

//       merged.push({
//         ...repo,
//         id: repo.id,
//         category,
//         tech: [repo.language].filter(Boolean),
//         featured: false
//       })
//     }
//   })

//   return merged
// }

const loadProjects = async () => {
  isLoading.value = true
  error.value = null

  try {
    // Ab ye sirf aapke JSON file wale projects ko hi load karega
    projects.value = fallbackProjects
  } catch (err) {
    console.warn('Error loading projects:', err.message)
    error.value = err.message
    // projects.value = fallbackProjects
  } finally {
    isLoading.value = false
    // Animate cards after loading completes
    await nextTick()
    staggerCards('.projects-grid', '.project-card-wrapper', { y: 80, stagger: 0.1 })
  }
}

const filteredProjects = computed(() => {
  let filtered = projects.value

  if (activeCategory.value !== 'All') {
    filtered = filtered.filter(p => {
      const pCats = p.category
      // Agar category ek list (Array) hai (jaise ["IoT", "PCB"])
      if (Array.isArray(pCats)) {
        return pCats.includes(activeCategory.value)
      }
      // Agar category ek normal string hai (jaise "Web")
      return pCats === activeCategory.value
    })
  }

  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    )
  }

  return filtered
})

const displayedProjects = computed(() => {
  return filteredProjects.value.slice(0, displayCount.value)
})

const hasMore = computed(() => {
  return displayedProjects.value.length < filteredProjects.value.length
})

const loadMore = () => {
  displayCount.value += 6
}

const openModal = (project) => {
  selectedProject.value = project
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  selectedProject.value = null
}

onMounted(async () => {
  await nextTick()
  slideInLeft('.projects-heading')
  loadProjects()
})
</script>

<template>
  <section id="projects" class="py-20 bg-white dark:bg-dark-surface transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="projects-heading text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Featured Projects</h2>
        <div class="w-16 h-1 bg-primary mx-auto rounded-full mb-8"></div>

        <!-- Search Bar -->
        <div class="max-w-md mx-auto mb-8">
          <div class="relative">
            <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input v-model="searchQuery" type="text" placeholder="Search projects..."
              class="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-background text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
        </div>

        <!-- Filter Tabs -->
        <div class="flex flex-wrap justify-center gap-2 md:gap-4">
          <button v-for="category in categories" :key="category" @click="activeCategory = category" :class="[
            'px-6 py-2 rounded-full text-sm font-medium transition-all duration-300',
            activeCategory === category
              ? 'bg-primary text-white shadow-lg scale-105'
              : 'bg-white dark:bg-dark-background text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
          ]">
            {{ category }}
          </button>
        </div>
      </div>

      <!-- Loading State — Skeleton Shimmer Cards -->
      <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="n in 6" :key="n" class="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
          <div class="skeleton h-48 w-full"></div>
          <div class="p-6 space-y-3">
            <div class="skeleton h-6 w-3/4"></div>
            <div class="skeleton h-4 w-full"></div>
            <div class="skeleton h-4 w-2/3"></div>
            <div class="flex gap-2 mt-4">
              <div class="skeleton h-6 w-16 rounded-full"></div>
              <div class="skeleton h-6 w-16 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Error Message -->
      <div v-else-if="error"
        class="bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-400 dark:border-yellow-700 text-yellow-800 dark:text-yellow-300 px-4 py-3 rounded-lg mb-8">
        <p class="font-medium">⚠️ Note: {{ error }}</p>
        <p class="text-sm mt-1">Showing featured projects.</p>
      </div>

      <!-- Projects Grid -->
      <div v-else class="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="project in displayedProjects" :key="project.id" class="project-card-wrapper">
          <ProjectCard :project="project" @open-modal="openModal" />
        </div>
      </div>

      <!-- No Results -->
      <div v-if="!isLoading && filteredProjects.length === 0" class="text-center py-12">
        <p class="text-gray-600 dark:text-gray-400 text-lg">No projects found matching your criteria.</p>
      </div>

      <!-- Load More Button -->
      <div v-if="hasMore" class="text-center mt-12">
        <button @click="loadMore" class="btn btn-neon btn-pill btn-lg">
          Load More Projects
        </button>
      </div>
    </div>

    <!-- Modal -->
    <ProjectModal v-if="selectedProject" :project="selectedProject" :is-open="isModalOpen" @close="closeModal" />
  </section>
</template>
