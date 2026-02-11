<script setup>
import { ref } from 'vue'
import * as THREE from 'three'
import { useThreeScene, isMobile } from '../three/useThreeScene'

const threeContainer = ref(null)
const hoveredTech = ref('')

const techs = [
  { name: 'Python',     color: 0x3776AB },
  { name: 'JavaScript', color: 0xF7DF1E },
  { name: 'Vue.js',     color: 0x42B883 },
  { name: 'React',      color: 0x61DAFB },
  { name: 'Flask',      color: 0x000000 },
  { name: 'TensorFlow', color: 0xFF6F00 },
  { name: 'Docker',     color: 0x2496ED },
  { name: 'Arduino',    color: 0x00979D },
]

const { webglSupported } = useThreeScene(threeContainer, {
  cameraOptions: { fov: 50, position: [0, 0, 6] },

  setup(scene, camera, renderer) {
    const mobile = isMobile()
    const cubes = []

    // Distribute cubes in a ring pattern
    techs.forEach((tech, i) => {
      const angle = (i / techs.length) * Math.PI * 2
      const radius = 2.2

      const geo = new THREE.BoxGeometry(0.4, 0.4, 0.4)
      // Rounded edges via bevel
      const mat = new THREE.MeshStandardMaterial({
        color: tech.color,
        roughness: 0.3,
        metalness: 0.6,
        emissive: tech.color,
        emissiveIntensity: 0.15,
      })
      const cube = new THREE.Mesh(geo, mat)

      cube.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius * 0.6,
        (Math.random() - 0.5) * 1.5
      )
      cube.userData = { name: tech.name, baseY: cube.position.y, index: i }
      scene.add(cube)
      cubes.push(cube)
    })

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.6))
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8)
    dirLight.position.set(3, 5, 5)
    scene.add(dirLight)

    // Raycaster for hover
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()
    let hoveredObj = null

    const onMouseMove = (e) => {
      if (!renderer.domElement) return
      const rect = renderer.domElement.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    }

    const container = threeContainer.value
    if (container) {
      container.addEventListener('mousemove', onMouseMove)
    }

    return {
      cubes,
      raycaster,
      mouse,
      camera,
      hoveredObj,
      cleanup: () => {
        if (container) container.removeEventListener('mousemove', onMouseMove)
      }
    }
  },

  animate(delta, elapsed, data) {
    if (!data?.cubes) return

    const { cubes, raycaster, mouse, camera } = data

    // Float animation for each cube
    cubes.forEach((cube, i) => {
      const baseY = cube.userData.baseY
      cube.position.y = baseY + Math.sin(elapsed * 1.2 + i * 0.8) * 0.15
      cube.rotation.x = elapsed * 0.3 + i * 0.5
      cube.rotation.y = elapsed * 0.4 + i * 0.3
    })

    // Raycaster hover detection
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(cubes)

    // Reset all scales
    cubes.forEach((cube) => {
      cube.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
      cube.material.emissiveIntensity = 0.15
    })

    if (intersects.length > 0) {
      const hit = intersects[0].object
      hit.scale.lerp(new THREE.Vector3(1.4, 1.4, 1.4), 0.15)
      hit.material.emissiveIntensity = 0.5
      hoveredTech.value = hit.userData.name
    } else {
      hoveredTech.value = ''
    }
  },
})
</script>

<template>
  <div class="relative">
    <div
      ref="threeContainer"
      class="w-full h-64 md:h-80 rounded-2xl overflow-hidden"
      aria-hidden="true"
    ></div>

    <!-- Hovered tech name tooltip -->
    <Transition name="fade">
      <div
        v-if="hoveredTech"
        class="absolute top-4 left-1/2 -translate-x-1/2 bg-gray-900/90 dark:bg-gray-100/90 text-white dark:text-gray-900 px-4 py-1.5 rounded-full text-sm font-semibold backdrop-blur-sm shadow-lg pointer-events-none"
      >
        {{ hoveredTech }}
      </div>
    </Transition>

    <!-- Fallback -->
    <div
      v-if="!webglSupported"
      class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-2xl"
    >
      <p class="text-gray-500 dark:text-gray-400 text-sm">3D preview unavailable</p>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
