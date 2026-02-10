<script setup>
import { ref, onMounted } from 'vue'
import { Briefcase, ChevronDown, ChevronUp } from 'lucide-vue-next'

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
    id: 3,
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
const isVisible = ref(false)
const sectionRef = ref(null)

const toggleExpand = (index) => {
  items.value[index].expanded = !items.value[index].expanded
}

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        isVisible.value = true
        observer.disconnect()
      }
    })
  }, { threshold: 0.1 })
  
  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }
})
</script>

<template>
  <section id="experience" ref="sectionRef" class="py-20 bg-gray-50 dark:bg-dark-background/50 transition-colors duration-300">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Work Experience</h2>
        <div class="w-16 h-1 bg-primary mx-auto rounded-full"></div>
      </div>

      <div class="relative">
        <!-- Timeline Line -->
        <div class="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-700 transform -translate-x-1/2 hidden md:block"></div>

        <!-- Timeline Items -->
        <div class="space-y-12">
          <div 
            v-for="(item, index) in items" 
            :key="item.id"
            :class="[
              'relative transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            ]"
            :style="{ transitionDelay: `${index * 200}ms` }"
          >
            <!-- Desktop Layout (Alternating) -->
            <div class="hidden md:grid md:grid-cols-2 gap-8">
              <!-- Left Side (Odd) -->
              <div :class="index % 2 === 0 ? 'text-right' : 'order-2'">
                <div 
                  v-if="index % 2 === 0"
                  class="bg-white dark:bg-dark-surface p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow cursor-pointer"
                  @click="toggleExpand(index)"
                >
                  <div class="flex items-start justify-between mb-4">
                    <div class="flex-1">
                      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-1">{{ item.role }}</h3>
                      <p class="text-primary font-semibold mb-2">{{ item.company }}</p>
                      <p class="text-sm text-gray-500">{{ item.duration }} • {{ item.period }}</p>
                    </div>
                    <component :is="item.expanded ? ChevronUp : ChevronDown" class="w-5 h-5 text-gray-400 ml-4" />
                  </div>

                  <Transition name="expand">
                    <div v-if="item.expanded" class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <ul class="space-y-2 text-left text-gray-600 dark:text-gray-400 text-sm mb-4">
                        <li v-for="resp in item.responsibilities" :key="resp" class="flex items-start">
                          <span class="text-primary mr-2">•</span>
                          <span>{{ resp }}</span>
                        </li>
                      </ul>
                      <div class="flex flex-wrap gap-2 justify-start">
                        <span v-for="tech in item.tech" :key="tech" class="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                          {{ tech }}
                        </span>
                      </div>
                    </div>
                  </Transition>
                </div>
              </div>

              <!-- Right Side (Even) -->
              <div :class="index % 2 === 1 ? '' : 'order-1'">
                <div 
                  v-if="index % 2 === 1"
                  class="bg-white dark:bg-dark-surface p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow cursor-pointer"
                  @click="toggleExpand(index)"
                >
                  <div class="flex items-start justify-between mb-4">
                    <div class="flex-1">
                      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-1">{{ item.role }}</h3>
                      <p class="text-primary font-semibold mb-2">{{ item.company }}</p>
                      <p class="text-sm text-gray-500">{{ item.duration }} • {{ item.period }}</p>
                    </div>
                    <component :is="item.expanded ? ChevronUp : ChevronDown" class="w-5 h-5 text-gray-400 ml-4" />
                  </div>

                  <Transition name="expand">
                    <div v-if="item.expanded" class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <ul class="space-y-2 text-gray-600 dark:text-gray-400 text-sm mb-4">
                        <li v-for="resp in item.responsibilities" :key="resp" class="flex items-start">
                          <span class="text-primary mr-2">•</span>
                          <span>{{ resp }}</span>
                        </li>
                      </ul>
                      <div class="flex flex-wrap gap-2">
                        <span v-for="tech in item.tech" :key="tech" class="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                          {{ tech }}
                        </span>
                      </div>
                    </div>
                  </Transition>
                </div>
              </div>
            </div>

            <!-- Timeline Dot -->
            <div class="absolute left-1/2 top-8 w-4 h-4 bg-primary rounded-full transform -translate-x-1/2 border-4 border-white dark:border-dark-background hidden md:block z-10"></div>

            <!-- Mobile Layout (Stacked) -->
            <div class="md:hidden">
              <div 
                class="bg-white dark:bg-dark-surface p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow cursor-pointer"
                @click="toggleExpand(index)"
              >
                <div class="flex items-start justify-between mb-4">
                  <div class="flex-1">
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-1">{{ item.role }}</h3>
                    <p class="text-primary font-semibold mb-2">{{ item.company }}</p>
                    <p class="text-sm text-gray-500">{{ item.duration }} • {{ item.period }}</p>
                  </div>
                  <component :is="item.expanded ? ChevronUp : ChevronDown" class="w-5 h-5 text-gray-400 ml-4" />
                </div>

                <Transition name="expand">
                  <div v-if="item.expanded" class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <ul class="space-y-2 text-gray-600 dark:text-gray-400 text-sm mb-4">
                      <li v-for="resp in item.responsibilities" :key="resp" class="flex items-start">
                        <span class="text-primary mr-2">•</span>
                        <span>{{ resp }}</span>
                      </li>
                    </ul>
                    <div class="flex flex-wrap gap-2">
                      <span v-for="tech in item.tech" :key="tech" class="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                        {{ tech }}
                      </span>
                    </div>
                  </div>
                </Transition>
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
