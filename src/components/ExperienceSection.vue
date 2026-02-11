<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { Briefcase, ChevronDown, ChevronUp } from 'lucide-vue-next'
import { useScrollAnimation } from '../composables/useScrollAnimation'

const { slideInLeft, staggerCards } = useScrollAnimation()

const experiences = [
  {
    id: 1,
    company: 'Airbuddy Aerospace Pvt. Ltd.',
    role: 'IoT Intern',
    duration: 'May 2025 - Nov 2025',
    period: '6 months',
    responsibilities: [
      'Designed PCB Trace Width and Magnet Calculators',
      'Implemented IPC-2221 standards',
      'Enhanced IoT and motor design accuracy'
    ],
    tech: ['Python', 'IPC-2221', 'PCB Design'],
    expanded: false
  },
  {
    id: 2,
    company: 'Smart India Hackathon',
    role: 'Team Lead',
    duration: '2024',
    period: 'Project Phase',
    responsibilities: [
      'Led team in developing AI-based solution',
      'Architected full-stack application',
      'Managed project timeline and deliverables'
    ],
    tech: ['React', 'Node.js', 'AI/ML'],
    expanded: false
  },
  {
    id: 3,
    company: 'DeepValley EMA',
    role: 'IoT Software Developer Intern',
    duration: 'Jun 2024 - Aug 2024',
    period: '2 months',
    responsibilities: [
      'Developed smart lithium-ion battery management system',
      'Built Azure IoT Hub pipelines',
      'Real-time monitoring and device synchronization'
    ],
    tech: ['Azure IoT Hub', 'Python', 'Cloud Architecture'],
    expanded: false
  },
  {
    id: 4,
    company: 'NIELIT, Patna',
    role: 'Industrial Training - IoT',
    duration: 'Dec 2024',
    period: '1 month',
    responsibilities: [
      'Sensor integration with Arduino and ESP32',
      'Cloud platform connectivity',
      'IoT system design fundamentals'
    ],
    tech: ['Arduino', 'ESP32', 'IoT Protocols'],
    expanded: false
  }
]

const items = ref(experiences)
const sectionRef = ref(null)

const toggleExpand = (index) => {
  items.value[index].expanded = !items.value[index].expanded
}

onMounted(async () => {
  await nextTick()
  slideInLeft('.experience-heading')

  // Wait a tick then set up alternating slide-in for timeline cards
  setTimeout(() => {
    alternatingSlideIn('.experience-timeline', '.experience-card', { distance: 80, duration: 0.8 })
  }, 100)
})
</script>

<template>
  <section id="experience" ref="sectionRef" class="py-20 bg-gray-50 dark:bg-dark-background/50 transition-colors duration-300">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="experience-heading text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Work Experience</h2>
        <div class="w-16 h-1 bg-primary mx-auto rounded-full"></div>
      </div>

      <div class="experience-timeline relative max-w-4xl mx-auto">
        <!-- Timeline Line (Background) -->
        <div class="absolute left-[19px] top-4 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800 hidden"></div>

        <div class="space-y-8">
          <div 
            v-for="(item, index) in items" 
            :key="item.id"
            class="experience-card-timeline group"
          >
            <!-- Timeline Marker -->
            <div class="timeline-marker">
              <div class="marker-dot group-hover:scale-125 transition-transform duration-300"></div>
              <div v-if="index !== items.length - 1" class="marker-line"></div>
            </div>

            <!-- Card Content -->
            <div 
              class="card-content-timeline cursor-pointer"
              @click="toggleExpand(index)"
            >
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                <div class="flex items-center gap-4">
                  <!-- Company Logo Placeholder (Initials) -->
                  <div class="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xl font-bold text-primary shrink-0">
                    {{ item.company.charAt(0) }}
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ item.role }}</h3>
                    <p class="text-primary font-medium">{{ item.company }}</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">{{ item.duration }}</p>
                  <p class="text-xs text-gray-500">{{ item.period }}</p>
                </div>
              </div>

              <div class="pl-16">
                 <ul class="achievements space-y-2 text-gray-600 dark:text-gray-400 text-sm mb-4">
                    <li v-for="resp in item.responsibilities.slice(0, 2)" :key="resp">
                      {{ resp }}
                    </li>
                    <li v-if="item.responsibilities.length > 2 && !item.expanded" class="text-xs text-gray-400 italic">
                      + {{ item.responsibilities.length - 2 }} more...
                    </li>
                     <template v-if="item.expanded">
                        <li v-for="resp in item.responsibilities.slice(2)" :key="resp">
                          {{ resp }}
                        </li>
                     </template>
                 </ul>

                 <div class="flex flex-wrap gap-2">
                    <span v-for="tech in item.tech" :key="tech" class="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded text-xs font-medium">
                      {{ tech }}
                    </span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
}

.expand-enter-to,
.expand-leave-from {
  opacity: 1;
  max-height: 500px;
}
</style>
