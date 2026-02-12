<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useScrollAnimation } from '../composables/useScrollAnimation'

const { staggerCards } = useScrollAnimation()

const techIcons = [
  { name: 'Python', icon: 'devicon-python-plain', color: '#3776AB' },
  { name: 'C/C++', icon: 'devicon-cplusplus-plain', color: '#00599C' },
  { name: 'JavaScript', icon: 'devicon-javascript-plain', color: '#F7DF1E' },
  { name: 'HTML5', icon: 'devicon-html5-plain', color: '#E34F26' },
  { name: 'CSS3', icon: 'devicon-css3-plain', color: '#1572B6' },
  { name: 'React', icon: 'devicon-react-original', color: '#61DAFB' },
  { name: 'Vue.js', icon: 'devicon-vuejs-plain', color: '#4FC08D' },
  { name: 'Flask', icon: 'devicon-flask-original', color: '#000000' },
  { name: 'FastAPI', icon: 'devicon-fastapi-plain', color: '#000000' },
  { name: 'TensorFlow', icon: 'devicon-tensorflow-original', color: '#FF6F00' },
  { name: 'PyTorch', icon: 'devicon-pytorch-plain', color: '#FF6F00' },
  { name: 'Docker', icon: 'devicon-docker-plain', color: '#2496ED' },
  { name: 'MySQL', icon: 'devicon-mysql-plain', color: '#4479A1' },
  { name: 'MongoDB', icon: 'devicon-mongodb-plain', color: '#47A248' },
  { name: 'Git', icon: 'devicon-git-plain', color: '#F05032' },
  { name: 'GitHub', icon: 'devicon-github-original', color: '#181717' },
  { name: 'Linux', icon: 'devicon-linux-plain', color: '#000000' },
  { name: 'Bash', icon: 'devicon-bash-plain', color: '#000000' },
  { name: 'CI/CD', icon: 'devicon-cicd-plain', color: '#000000' },
  { name: 'REST APIs', icon: 'devicon-rest-api-plain', color: '#000000' },
  { name: 'Cloudflare', icon: 'devicon-cloudflare-plain', color: '#000000' },
  { name: 'Azure', icon: 'devicon-azure-plain', color: '#0078D4' },
  { name: 'AWS', icon: 'devicon-aws-plain', color: '#000000' },
  { name: 'GCP', icon: 'devicon-gcp-plain', color: '#000000' },
  { name: 'ESP32', icon: 'devicon-esp32-plain', color: '#000000' },
  { name: 'Arduino', icon: 'devicon-arduino-plain', color: '#00979D' },
  { name: 'Raspberry Pi', icon: 'devicon-raspberrypi-plain', color: '#000000' },
  { name: 'PCB', icon: 'devicon-pcb-plain', color: '#000000' },
  { name: 'AI', icon: 'devicon-ai-plain', color: '#000000' },
  { name: 'ML', icon: 'devicon-ml-plain', color: '#000000' },
  { name: 'Matplotlib', icon: 'devicon-matplotlib-plain', color: '#000000' },
  { name: 'Seaborn', icon: 'devicon-seaborn-plain', color: '#000000' },
  { name: 'OpenCV', icon: 'devicon-opencv-plain', color: '#000000' },
  { name: 'Keras', icon: 'devicon-keras-plain', color: '#000000' },
  { name: 'Scikit-learn', icon: 'devicon-scikit-learn-plain', color: '#000000' },
  { name: 'Pandas', icon: 'devicon-pandas-plain', color: '#000000' },
  { name: 'NumPy', icon: 'devicon-numpy-plain', color: '#000000' }
]

const isVisible = ref(false)
const cloudRef = ref(null)

onMounted(async () => {
  // Observe for bounce-in
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        isVisible.value = true
        observer.disconnect()
      }
    })
  }, { threshold: 0.2 })

  if (cloudRef.value) {
    observer.observe(cloudRef.value)
  }

  await nextTick()
  staggerCards('.tech-cloud-grid', '.tech-icon-wrapper', { y: 30, stagger: 0.04, duration: 0.5 })
})
</script>

<template>
  <div ref="cloudRef" class="tech-cloud-grid flex flex-wrap justify-center gap-6 md:gap-8 py-8">
    <div v-for="(tech, index) in techIcons" :key="tech.name" class="tech-icon-wrapper flex flex-col items-center">
      <i :class="[tech.icon, 'tech-icon', { 'icon-bounce': isVisible }]"
        :style="{ animationDelay: `${index * 0.05}s`, '--brand-color': tech.color }" aria-hidden="true"></i>
      <span class="tooltip">{{ tech.name }}</span>
    </div>
  </div>
</template>

<style scoped>
.tech-icon:hover {
  color: var(--brand-color) !important;
}
</style>
