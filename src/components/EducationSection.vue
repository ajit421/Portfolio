<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { GraduationCap, School, BookOpen } from 'lucide-vue-next'
import { useScrollAnimation } from '../composables/useScrollAnimation'

const { slideInLeft, alternatingSlideIn } = useScrollAnimation()

const educationItems = [
  {
    id: 1,
    degree: 'B.Tech in Computer Science & Engineering',
    specialization: 'Internet of Things (IoT)',
    institution: 'Government Engineering College, Khagaria',
    duration: '2022 - 2026',
    type: 'Graduation',
    icon: GraduationCap,
    description: 'Specialization in IoT Systems, AI/ML, and intelligent system design'
  },
  {
    id: 2,
    degree: 'Intermediate (12th)',
    specialization: 'BSEB Board',
    institution: 'B.S.S. College, Bachri Piro',
    duration: '2020 - 2022',
    type: 'Senior Secondary',
    icon: School,
    description: 'Completed higher secondary education with focus on Science stream'
  },
  {
    id: 3,
    degree: 'Matriculation (10th)',
    specialization: 'BSEB Board',
    institution: 'Sri Surya Nath High School, Hanswadih',
    duration: '2020',
    type: 'Secondary',
    icon: BookOpen,
    description: 'Completed secondary education with strong academic foundation'
  }
]

const items = ref(educationItems)
const sectionRef = ref(null)

onMounted(async () => {
  await nextTick()
  slideInLeft('.education-heading')

  setTimeout(() => {
    alternatingSlideIn('.education-timeline', '.education-card', { distance: 80, duration: 0.8 })
  }, 100)
})
</script>

<template>
  <section id="education" ref="sectionRef" class="py-20 bg-white dark:bg-dark-surface transition-colors duration-300">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="education-heading text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Education</h2>
        <div class="w-16 h-1 bg-primary mx-auto rounded-full"></div>
      </div>

      <div class="education-timeline relative">
        <!-- Timeline Line -->
        <div class="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-700 md:transform md:-translate-x-1/2"></div>

        <!-- Timeline Items -->
        <div class="space-y-12">
          <div 
            v-for="(item, index) in items" 
            :key="item.id"
            class="education-card relative"
          >
            <!-- Desktop Layout (Alternating) -->
            <div class="hidden md:grid md:grid-cols-2 gap-8">
              <!-- Left Side (Odd) -->
              <div :class="index % 2 === 0 ? 'text-right pr-8' : 'order-2 pl-8'">
                <div v-if="index % 2 === 0">
                  <div class="glow-border inline-block bg-white dark:bg-dark-background p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left max-w-md">
                    <div class="flex items-start gap-4 mb-4">
                      <div class="p-3 bg-primary/10 rounded-full">
                        <component :is="item.icon" class="w-6 h-6 text-primary" />
                      </div>
                      <div class="flex-1">
                        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-1">{{ item.degree }}</h3>
                        <p class="text-primary font-semibold text-sm mb-2">{{ item.specialization }}</p>
                      </div>
                    </div>
                    <p class="text-gray-700 dark:text-gray-300 font-medium mb-1">{{ item.institution }}</p>
                    <p class="text-sm text-gray-500 mb-3">{{ item.duration }}</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">{{ item.description }}</p>
                  </div>
                </div>
              </div>

              <!-- Right Side (Even) -->
              <div :class="index % 2 === 1 ? 'pl-8' : 'order-1 pr-8'">
                <div v-if="index % 2 === 1">
                  <div class="glow-border bg-white dark:bg-dark-background p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 max-w-md">
                    <div class="flex items-start gap-4 mb-4">
                      <div class="p-3 bg-primary/10 rounded-full">
                        <component :is="item.icon" class="w-6 h-6 text-primary" />
                      </div>
                      <div class="flex-1">
                        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-1">{{ item.degree }}</h3>
                        <p class="text-primary font-semibold text-sm mb-2">{{ item.specialization }}</p>
                      </div>
                    </div>
                    <p class="text-gray-700 dark:text-gray-300 font-medium mb-1">{{ item.institution }}</p>
                    <p class="text-sm text-gray-500 mb-3">{{ item.duration }}</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">{{ item.description }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Timeline Dot -->
            <div class="absolute left-8 md:left-1/2 top-8 w-4 h-4 bg-primary rounded-full md:transform md:-translate-x-1/2 border-4 border-white dark:border-dark-surface z-10"></div>

            <!-- Mobile Layout (Stacked) -->
            <div class="md:hidden pl-12">
              <div class="glow-border bg-white dark:bg-dark-background p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                <div class="flex items-start gap-4 mb-4">
                  <div class="p-3 bg-primary/10 rounded-full">
                    <component :is="item.icon" class="w-6 h-6 text-primary" />
                  </div>
                  <div class="flex-1">
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-1">{{ item.degree }}</h3>
                    <p class="text-primary font-semibold text-sm mb-2">{{ item.specialization }}</p>
                  </div>
                </div>
                <p class="text-gray-700 dark:text-gray-300 font-medium mb-1">{{ item.institution }}</p>
                <p class="text-sm text-gray-500 mb-3">{{ item.duration }}</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ item.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
