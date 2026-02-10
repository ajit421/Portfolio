<script setup>
import { ref, computed, onMounted } from 'vue'

const skills = [
  // Languages
  { name: 'Python', category: 'Languages', level: 90 },
  { name: 'C/C++', category: 'Languages', level: 85 },
  { name: 'JavaScript', category: 'Languages', level: 80 },
  { name: 'HTML/CSS', category: 'Languages', level: 95 },
  { name: 'SQL', category: 'Languages', level: 85 },
  
  // Frameworks
  { name: 'Flask', category: 'Frameworks', level: 85 },
  { name: 'Streamlit', category: 'Frameworks', level: 90 },
  { name: 'FastAPI', category: 'Frameworks', level: 80 },
  { name: 'React/Vue', category: 'Frameworks', level: 75 },
  { name: 'TensorFlow/Keras', category: 'Frameworks', level: 70 },
  
  // Domains
  { name: 'IoT & Hardware', category: 'Domains', level: 90 },
  { name: 'Data Science', category: 'Domains', level: 85 },
  { name: 'Cloud (AWS/Azure)', category: 'Domains', level: 75 },
  { name: 'PCB Design', category: 'Domains', level: 80 },
]

const categories = ['All', 'Languages', 'Frameworks', 'Domains']
const activeCategory = ref('All')
const isVisible = ref(false)
const skillsSection = ref(null)

const filteredSkills = computed(() => {
  if (activeCategory.value === 'All') return skills
  return skills.filter(skill => skill.category === activeCategory.value)
})

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        isVisible.value = true
        observer.disconnect()
      }
    })
  }, { threshold: 0.2 })
  
  if (skillsSection.value) {
    observer.observe(skillsSection.value)
  }
})
</script>

<template>
  <section id="skills" class="py-20 bg-gray-50 dark:bg-dark-background/50 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Technical Skills</h2>
        <div class="w-16 h-1 bg-primary mx-auto rounded-full mb-8"></div>
        
        <!-- Filter Tabs -->
        <div class="flex flex-wrap justify-center gap-2 md:gap-4">
          <button 
            v-for="category in categories" 
            :key="category"
            @click="activeCategory = category"
            :class="[
              'px-6 py-2 rounded-full text-sm font-medium transition-all duration-300',
              activeCategory === category 
                ? 'bg-primary text-white shadow-lg scale-105' 
                : 'bg-white dark:bg-dark-surface text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            ]"
          >
            {{ category }}
          </button>
        </div>
      </div>

      <div ref="skillsSection" class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div 
          v-for="(skill, index) in filteredSkills" 
          :key="skill.name"
          class="bg-white dark:bg-dark-surface p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow"
        >
          <div class="flex justify-between items-end mb-2">
            <span class="font-bold text-gray-800 dark:text-white">{{ skill.name }}</span>
            <span class="text-sm font-mono text-primary">{{ skill.level }}%</span>
          </div>
          
          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
            <div 
              class="bg-gradient-to-r from-primary to-accent-success h-2.5 rounded-full transition-all duration-1000 ease-out"
              :style="{ width: isVisible ? `${skill.level}%` : '0%' }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
