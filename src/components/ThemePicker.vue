<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Palette } from 'lucide-vue-next'

const isOpen = ref(false)
const currentTheme = ref('cyberpunk')
const pickerRef = ref(null)

const themes = [
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    colors: ['#667eea', '#764ba2', '#f5576c', '#43e97b'],
  },
  {
    id: 'aurora',
    name: 'Aurora',
    colors: ['#6f86d6', '#48c6ef', '#fed6e3', '#a8edea'],
  },
  {
    id: 'sunset',
    name: 'Sunset',
    colors: ['#fa709a', '#fee140', '#30cfd0', '#ffecd2'],
  },
  {
    id: 'ocean',
    name: 'Ocean',
    colors: ['#2E3192', '#1BFFFF', '#00C9FF', '#92FE9D'],
  },
]

const applyTheme = (themeId) => {
  currentTheme.value = themeId
  document.documentElement.setAttribute('data-color-theme', themeId)
  localStorage.setItem('color-theme', themeId)
  isOpen.value = false
}

const togglePicker = () => {
  isOpen.value = !isOpen.value
}

// Close on outside click
const onClickOutside = (e) => {
  if (pickerRef.value && !pickerRef.value.contains(e.target)) {
    isOpen.value = false
  }
}

// Close on Escape
const onKeydown = (e) => {
  if (e.key === 'Escape') isOpen.value = false
}

onMounted(() => {
  // Restore saved theme
  const saved = localStorage.getItem('color-theme')
  if (saved && themes.some(t => t.id === saved)) {
    currentTheme.value = saved
    document.documentElement.setAttribute('data-color-theme', saved)
  }

  document.addEventListener('click', onClickOutside)
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div ref="pickerRef" class="relative">
    <!-- Trigger Button -->
    <button
      @click.stop="togglePicker"
      class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
      :aria-label="`Color theme: ${currentTheme}. Click to change.`"
      aria-haspopup="true"
      :aria-expanded="isOpen"
    >
      <Palette class="w-5 h-5 text-gray-700 dark:text-gray-200" />
    </button>

    <!-- Dropdown Panel -->
    <Transition name="theme-picker">
      <div
        v-if="isOpen"
        class="absolute right-0 top-12 w-52 glass-card rounded-xl p-3 z-50"
        role="listbox"
        aria-label="Select color theme"
      >
        <p class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-1">
          Color Theme
        </p>
        <button
          v-for="theme in themes"
          :key="theme.id"
          @click="applyTheme(theme.id)"
          class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group"
          :class="[
            currentTheme === theme.id
              ? 'bg-gray-100 dark:bg-gray-700/50'
              : 'hover:bg-gray-50 dark:hover:bg-gray-700/30'
          ]"
          role="option"
          :aria-selected="currentTheme === theme.id"
          :aria-label="`${theme.name} theme`"
        >
          <!-- Color Swatches -->
          <div class="flex -space-x-1">
            <span
              v-for="(color, i) in theme.colors"
              :key="i"
              class="w-4 h-4 rounded-full border-2 border-white dark:border-gray-800 shadow-sm"
              :style="{ backgroundColor: color, zIndex: 4 - i }"
            ></span>
          </div>

          <!-- Theme Name -->
          <span class="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white">
            {{ theme.name }}
          </span>

          <!-- Active Indicator -->
          <span
            v-if="currentTheme === theme.id"
            class="ml-auto w-2 h-2 rounded-full"
            :style="{ backgroundColor: theme.colors[0] }"
          ></span>
        </button>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.theme-picker-enter-active {
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.theme-picker-leave-active {
  transition: all 0.15s ease-in;
}
.theme-picker-enter-from {
  opacity: 0;
  transform: translateY(-8px) scale(0.96);
}
.theme-picker-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.98);
}
</style>
