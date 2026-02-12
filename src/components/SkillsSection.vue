<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useScrollAnimation } from '../composables/useScrollAnimation'
import TechIconCloud from './TechIconCloud.vue'
import { Server, Brain, Cloud, Cpu, Terminal, Database, Code2, Globe } from 'lucide-vue-next'

const { slideInLeft, scaleIn } = useScrollAnimation()

const skillCategories = [
  {
    title: 'Backend & Frontend Technologies',
    icon: Globe,
    skills: ['Flask', 'FastAPI', 'Vue.js', 'React', 'HTML/CSS', 'REST APIs']
  },
  {
    title: 'AI & Machine Learning',
    icon: Brain,
    skills: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'seaborn', 'OpenCV', 'TensorFlow', 'PyTorch', 'Keras', 'Scikit-learn', ]
  },
  {
    title: 'Data Engineering',
    icon: Database,
    skills: ['SQL', 'MySQL', 'MongoDB', 'Web Scraping', 'Pandas', 'NumPy', 'Matplotlib', 'seaborn', 'OpenCV']
  },
  {
    title: 'IoT & Embedded',
    icon: Cpu,
    skills: ['Arduino', 'ESP32', 'Raspberry Pi', 'C/C++', 'Microcontroller', 'PCB', 'Sensors', 'Actuators']
  },
  {
    title: 'Cloud Technologies',
    icon: Cloud,
    skills: ['AWS (EC2, S3)', 'Microsoft Azure', 'Google Cloud Platform', 'Docker', 'Linux', 'Git/GitHub', 'CI/CD', 'Cloudflare']
  },
  {
    title: 'Programming Languages',
    icon: Terminal,
    skills: ['C', 'C++','Python', 'HTML/CSS', 'JavaScript', 'Bash']
  }
]

onMounted(async () => {
  await nextTick()
  slideInLeft('.skills-heading')
  scaleIn('.skill-category-card', { stagger: 0.1 })
})
</script>

<template>
  <section id="skills" class="py-20 bg-gray-50 dark:bg-dark-background/50 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="skills-heading text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold gradient-text mb-4">Technical Skills</h2>
        <div class="w-16 h-1 bg-primary mx-auto rounded-full"></div>
      </div>

      <!-- Tech Icon Cloud (kept as visual header) -->
      <div class="mb-16">
        <TechIconCloud />
      </div>

      <!-- New Category Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="(category, index) in skillCategories" 
          :key="category.title"
          class="skill-category-card group bg-white dark:bg-dark-surface p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-white/5 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
        >
          <div class="flex items-center gap-4 mb-6">
            <div class="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
              <component :is="category.icon" class="w-6 h-6" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ category.title }}</h3>
          </div>

          <div class="flex flex-wrap gap-2">
            <span 
              v-for="skill in category.skills" 
              :key="skill"
              class="px-3 py-1.5 text-sm font-medium rounded-full bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 border border-transparent dark:border-white/5 group-hover:border-primary/20 transition-colors duration-300"
            >
              {{ skill }}
            </span>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* Optional: Add custom glow or specific transitions if needed */
.skill-category-card:hover {
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.1);
}
:root.dark .skill-category-card:hover {
  box-shadow: 0 10px 30px -10px rgba(59, 130, 246, 0.15); /* Primary color glow */
}
</style>
