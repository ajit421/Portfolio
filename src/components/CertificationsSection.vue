<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { Award, Trophy, Medal, Star, ExternalLink, CheckCircle } from 'lucide-vue-next'
import certificationsData from '../data/certifications.json'
import { useScrollAnimation } from '../composables/useScrollAnimation'

const { slideInLeft, staggerCards, scaleIn } = useScrollAnimation()

const certifications = ref(certificationsData.certifications || [])
const achievements = ref(certificationsData.achievements || [])
const selectedCert = ref(null)
const isModalOpen = ref(false)

const getIconComponent = (iconName) => {
  const icons = {
    trophy: Trophy,
    medal: Medal,
    star: Star,
    award: Award
  }
  return icons[iconName] || Award
}

const openCertModal = (cert) => {
  selectedCert.value = cert
  isModalOpen.value = true
}

const closeCertModal = () => {
  isModalOpen.value = false
  selectedCert.value = null
}

onMounted(async () => {
  await nextTick()
  slideInLeft('.cert-heading')
  staggerCards('.cert-grid', '.cert-badge', { y: 60, stagger: 0.1 })
  slideInLeft('.achievements-heading')
  scaleIn('.achievement-card', { stagger: 0.12 })
})
</script>

<template>
  <section id="certifications" class="py-20 bg-white dark:bg-dark-surface transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Certifications -->
      <div class="mb-20">
        <div class="cert-heading text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Certifications</h2>
          <div class="w-16 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div class="cert-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="cert in certifications" 
            :key="cert.id"
            @click="openCertModal(cert)"
            class="cert-badge group cursor-pointer"
          >
            <!-- Ribbon -->
            <div v-if="cert.verifyUrl" class="badge-ribbon">Verified</div>

            <!-- Content -->
            <div class="p-2">
              <div class="badge-icon text-5xl mb-4">
                <component :is="getIconComponent(cert.icon)" />
              </div>

              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                {{ cert.title }}
              </h3>
              
              <div class="text-sm text-gray-500 font-medium mb-4">
                <p class="text-primary">{{ cert.issuer }}</p>
                <p>{{ cert.date }}</p>
              </div>

              <div class="flex flex-col gap-2">
                 <button 
                  v-if="cert.verifyUrl"
                  @click.stop
                  class="verify-btn"
                >
                  <CheckCircle class="w-4 h-4" />
                  Verify Credential
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Achievements -->
      <div>
        <div class="achievements-heading text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Achievements</h2>
          <div class="w-16 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            v-for="achievement in achievements" 
            :key="achievement.id"
            class="achievement-card glow-border bg-white dark:bg-dark-background p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div class="flex items-start gap-4 mb-4">
              <div class="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                <component :is="getIconComponent(achievement.icon)" class="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-1">{{ achievement.title }}</h3>
                <p class="text-primary text-sm font-semibold mb-2">{{ achievement.organization }}</p>
              </div>
            </div>
            <p class="text-gray-600 dark:text-gray-400 text-sm mb-2">{{ achievement.description }}</p>
            <p class="text-gray-500 text-xs">{{ achievement.date }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Certificate Modal -->
    <Teleport to="body">
      <Transition name="modal-enhanced">
        <div 
          v-if="isModalOpen && selectedCert" 
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          @click="closeCertModal"
        >
          <Transition name="modal-content" appear>
            <div 
              class="bg-white dark:bg-dark-surface rounded-2xl shadow-2xl max-w-lg w-full p-8"
              @click.stop
            >
              <div class="flex items-center justify-between mb-6">
                <div class="p-4 bg-primary/10 rounded-xl">
                  <Award class="w-12 h-12 text-primary" />
                </div>
                <button 
                  @click="closeCertModal"
                  class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>

              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">{{ selectedCert.title }}</h3>
              <p class="text-primary font-semibold mb-4">{{ selectedCert.issuer }}</p>
              
              <div class="space-y-3 mb-6">
                <div class="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span class="text-gray-600 dark:text-gray-400">Date</span>
                  <span class="font-medium text-gray-900 dark:text-white">{{ selectedCert.date }}</span>
                </div>
                <div v-if="selectedCert.score" class="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span class="text-gray-600 dark:text-gray-400">Score</span>
                  <span class="font-bold text-accent-success">{{ selectedCert.score }}</span>
                </div>
                <div v-if="selectedCert.category" class="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span class="text-gray-600 dark:text-gray-400">Category</span>
                  <span class="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">{{ selectedCert.category }}</span>
                </div>
              </div>

              <p v-if="selectedCert.description" class="text-gray-600 dark:text-gray-400 mb-6">
                {{ selectedCert.description }}
              </p>

              <div class="flex gap-3">
                <a 
                  v-if="selectedCert.certificateUrl && selectedCert.certificateUrl !== '#'"
                  :href="selectedCert.certificateUrl"
                  target="_blank"
                  class="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  <ExternalLink class="w-5 h-5" />
                  View Certificate
                </a>
                <a 
                  v-if="selectedCert.verifyUrl && selectedCert.verifyUrl !== '#'"
                  :href="selectedCert.verifyUrl"
                  target="_blank"
                  class="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary hover:text-primary transition-colors font-medium"
                >
                  <CheckCircle class="w-5 h-5" />
                  Verify
                </a>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>
