<script setup>
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { useScrollAnimation } from '../composables/useScrollAnimation'
import TechIconCloud from './TechIconCloud.vue'
import ThreeFloatingIcons from './ThreeFloatingIcons.vue'

const { slideInLeft, scaleIn } = useScrollAnimation()

const skills = [
  // Languages
  { name: 'Python', category: 'Languages', level: 90, detail: 'Data Science, Automation, ML', devicon: 'devicon-python-plain' },
  { name: 'C/C++', category: 'Languages', level: 85, detail: 'Embedded Systems, DSA', devicon: 'devicon-cplusplus-plain' },
  { name: 'JavaScript', category: 'Languages', level: 80, detail: 'Web Apps, Node.js', devicon: 'devicon-javascript-plain' },
  { name: 'HTML/CSS', category: 'Languages', level: 95, detail: 'Semantic, Responsive', devicon: 'devicon-html5-plain' },
  { name: 'SQL', category: 'Languages', level: 85, detail: 'MySQL, PostgreSQL', devicon: 'devicon-mysql-plain' },
  
  // Frameworks
  { name: 'Flask', category: 'Frameworks', level: 85, detail: 'REST APIs, Web Apps', devicon: 'devicon-flask-original' },
  { name: 'Streamlit', category: 'Frameworks', level: 90, detail: 'Data Dashboards', devicon: 'devicon-streamlit-plain' },
  { name: 'FastAPI', category: 'Frameworks', level: 80, detail: 'Async APIs', devicon: 'devicon-fastapi-plain' },
  { name: 'React/Vue', category: 'Frameworks', level: 75, detail: 'SPA Development', devicon: 'devicon-vuejs-plain' },
  { name: 'TensorFlow/Keras', category: 'Frameworks', level: 70, detail: 'Neural Networks', devicon: 'devicon-tensorflow-original' },
  
  // Domains
  { name: 'IoT & Hardware', category: 'Domains', level: 90, detail: 'Arduino, ESP32, Sensors', devicon: 'devicon-arduino-plain' },
  { name: 'Data Science', category: 'Domains', level: 85, detail: 'Pandas, NumPy, Viz', devicon: 'devicon-pandas-original' },
  { name: 'Cloud (AWS/Azure)', category: 'Domains', level: 75, detail: 'IoT Hub, Lambda', devicon: 'devicon-azure-plain' },
  { name: 'PCB Design', category: 'Domains', level: 80, detail: 'KiCad, IPC Standards', devicon: 'devicon-linux-plain' },
]

const categories = ['All', 'Languages', 'Frameworks', 'Domains']
const activeCategory = ref('All')
const isVisible = ref(false)
const skillsSection = ref(null)

const filteredSkills = computed(() => {
  if (activeCategory.value === 'All') return skills
  return skills.filter(skill => skill.category === activeCategory.value)
})

onMounted(async () => {
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

  await nextTick()
  slideInLeft('.skills-heading')
})

// Re-animate cards when category filter changes
watch(activeCategory, async () => {
  await nextTick()
  scaleIn('.skill-card', { scale: 0.85, duration: 0.4, ease: 'power2.out', stagger: 0.05 })
})
</script>

<template>
  <section id="skills" class="py-20 bg-gray-50 dark:bg-dark-background/50 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="skills-heading text-center mb-8">
        <h2 class="text-3xl md:text-4xl font-bold gradient-text mb-4">Technical Skills</h2>
        <div class="w-16 h-1 bg-primary mx-auto rounded-full"></div>
      </div>

      <!-- Tech Icon Cloud -->
      <TechIconCloud />

      <!-- 3D Floating Tech Icons -->
      <div class="mb-10">
        <ThreeFloatingIcons />
      </div>

      <!-- Filter Tabs -->
      <div class="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
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

      <div ref="skillsSection" class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div 
          v-for="(skill, index) in filteredSkills" 
          :key="skill.name"
          class="skill-card group"
        >
          <div class="card-inner">
            <!-- Front Face -->
            <div class="card-front">
              <i :class="skill.devicon" class="text-5xl mb-4 text-gray-700 dark:text-gray-300 group-hover:scale-110 transition-transform duration-300" aria-hidden="true"></i>
              <h4 class="text-xl font-bold text-gray-900 dark:text-white mb-2">{{ skill.name }}</h4>
              
              <div class="w-full mt-2">
                <div class="flex justify-between text-xs font-semibold mb-1 text-gray-500">
                  <span>Proficiency</span>
                  <span>{{ skill.level }}%</span>
                </div>
                <div class="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                  <div 
                    class="proficiency-bar"
                    :style="{ '--width': `${skill.level}%` }"
                  ></div>
                </div>
              </div>
            </div>

            <!-- Back Face -->
            <div class="card-back">
              <div class="w-full h-full flex flex-col justify-center">
                <div class="flex items-center gap-3 mb-4 border-b border-white/20 pb-3">
                  <i :class="skill.devicon" class="text-3xl" aria-hidden="true"></i>
                  <span class="text-xl font-bold">{{ skill.name }}</span>
                </div>
                
                <p class="text-sm font-medium opacity-90 mb-2 uppercase tracking-wider">{{ skill.category }}</p>
                <p class="text-sm opacity-80 leading-relaxed">{{ skill.detail }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
