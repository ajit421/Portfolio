<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { Award, Code, Layers, MapPin, Sparkles, BadgeCheck } from 'lucide-vue-next'
import { useScrollAnimation } from '../composables/useScrollAnimation'

const { slideInLeft, slideInRight, scaleIn } = useScrollAnimation()

const stats = ref([
  { label: 'Projects', value: 15, suffix: '+', icon: Layers },
  { label: 'Technologies', value: 30, suffix: '+', icon: Code },
  { label: 'Certifications', value: 5, suffix: '+', icon: Award },
])

const animatedValues = ref(stats.value.map(() => 0))
const statSection = ref(null)

const runCounter = (index, target) => {
  const duration = 2000 // ms
  const frameDuration = 1000 / 60
  const totalFrames = Math.round(duration / frameDuration)
  const easeOutQuad = t => t * (2 - t)
  
  let frame = 0
  const counter = setInterval(() => {
    frame++
    const progress = easeOutQuad(frame / totalFrames)
    animatedValues.value[index] = Math.round(target * progress)
    
    if (frame === totalFrames) {
      clearInterval(counter)
      animatedValues.value[index] = target
    }
  }, frameDuration)
}

onMounted(async () => {
  // Counter animation on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        stats.value.forEach((stat, index) => {
          runCounter(index, stat.value)
        })
        observer.disconnect()
      }
    })
  }, { threshold: 0.5 })
  
  if (statSection.value) {
    observer.observe(statSection.value)
  }

  await nextTick()

  // Scroll animations
  slideInLeft('.about-heading')
  slideInRight('.about-content')
  scaleIn('.about-badge', { stagger: 0.1 })
})
</script>

<template>
  <section id="about" class="py-20 bg-white dark:bg-dark-surface transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="about-heading text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">About Me</h2>
        <div class="w-16 h-1 bg-primary mx-auto rounded-full"></div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Image/Profile Column -->
        <div class="about-heading relative group">
          <div class="absolute -inset-1 bg-gradient-to-r from-primary to-accent-success rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
          <div class="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl aspect-square flex items-center justify-center">
             <!-- Placeholder for Profile Image -->
             <div class="text-center p-8">
                <div class="w-32 h-32 mx-auto bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4 text-4xl">
                  <img src="https://res.cloudinary.com/dsk6zd1rj/image/upload/v1770879509/pic_gcuzzg.jpg" alt="Profile Image" class="w-full h-full object-cover">
                </div>
                <p class="text-sm text-gray-500">Profile Image Placeholder</p>
             </div>
             
             <!-- Floating Badge with Sparkles -->
             <div class="absolute bottom-6 right-6 bg-white dark:bg-gray-900 px-4 py-2 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 animate-bounce">
                <span class="flex items-center gap-1 text-xs font-bold text-primary uppercase tracking-wider">
                  <Sparkles class="w-3 h-3 icon-float" aria-hidden="true" />
                  Currently Learning
                </span>
                <span class="text-sm font-medium text-gray-800 dark:text-gray-200">Deep Learning</span>
             </div>

             <div class="absolute bottom-6 left-6 bg-white dark:bg-gray-900 px-4 py-2 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 animate-bounce">
                <span class="flex items-center gap-1 text-xs font-bold text-primary uppercase tracking-wider">
                  <Sparkles class="w-3 h-3 icon-float" aria-hidden="true" />
                  Currently Working
                </span>
                <span class="text-sm font-medium text-gray-800 dark:text-gray-200">Airbuddy Airospace Pvt. Ltd.</span>
             </div>

             <!-- Location Badge -->
             <div class="absolute top-6 left-6 bg-white dark:bg-gray-900 px-3 py-1.5 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
                <span class="flex items-center gap-1 text-xs font-medium text-gray-600 dark:text-gray-400">
                  <MapPin class="w-3 h-3 text-red-500" aria-hidden="true" />
                  Bihar, India
                </span>
             </div>
          </div>
        </div>

        <!-- Content Column -->
        <div class="about-content info-card-glass">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Bridging the Gap Between <span class="text-primary">Hardware</span> & <span class="text-accent-success">Software</span>
          </h3>
          
          <div class="space-y-4 text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            <p>
              I am a Computer Science & Engineering student at <strong class="text-gray-900 dark:text-white">Government Engineering College, Khagaria</strong>, 
              specializing in Internet of Things. I spend my days exploring emerging technologies hands-on-building PCB calculators, 3D Models, 
              training neural networks, automating workflows, and deploying cloud-based solutions.
            </p>
            <p>
              From firmware to frontend, databases to deep learning, I thrive at the intersection of hardware and software.
            </p>
          </div>

          <!-- Achievements with BadgeCheck -->
          <div class="flex flex-wrap gap-4 mb-8">
            <span class="about-badge inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
              <BadgeCheck class="w-4 h-4" aria-hidden="true" />
              CDAC Bootcamp 2024 Winner
            </span>
            <span class="about-badge inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
              <BadgeCheck class="w-4 h-4" aria-hidden="true" />
              NPTEL IoT Certified (90%)
            </span>
            <span class="about-badge inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
              <BadgeCheck class="w-4 h-4" aria-hidden="true" />
              Intern Airbuddy Aerospace
            </span>
          </div>

          <!-- Counters -->
          <div ref="statSection" class="grid grid-cols-3 gap-4 border-t border-gray-200 dark:border-gray-700 pt-8">
            <div v-for="(stat, index) in stats" :key="stat.label" class="text-center">
              <component :is="stat.icon" class="w-6 h-6 mx-auto mb-2 text-primary" aria-hidden="true" />
              <div class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                {{ animatedValues[index] }}{{ stat.suffix }}
              </div>
              <div class="text-xs md:text-sm text-gray-500 uppercase tracking-wide mt-1">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
