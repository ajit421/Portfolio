import { onMounted, onUnmounted, ref, shallowRef } from 'vue'
import * as THREE from 'three'

/**
 * Detect if device is mobile / low-power.
 */
export const isMobile = () =>
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
    window.innerWidth < 768

/**
 * Check WebGL support.
 */
export const hasWebGL = () => {
    try {
        const canvas = document.createElement('canvas')
        return !!(
            window.WebGLRenderingContext &&
            (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
        )
    } catch {
        return false
    }
}

/**
 * Core composable that creates a Three.js scene with lifecycle management.
 *
 * @param {Ref}    containerRef
 * @param {Object} options
 * @param {Function} options.setup   - (scene, camera, renderer) => dataObject
 *                                     The returned object is passed to animate as 3rd arg.
 *                                     Include a `cleanup` key for teardown logic.
 * @param {Function} options.animate - (delta, elapsed, data) => void
 * @param {Object}   options.cameraOptions - { fov, near, far, position }
 */
export function useThreeScene(containerRef, options = {}) {
    const {
        setup = () => ({}),
        animate = () => { },
        cameraOptions = {},
    } = options

    const webglSupported = ref(true)
    const scene = shallowRef(null)
    const camera = shallowRef(null)
    const renderer = shallowRef(null)

    let animationId = null
    let clock = null
    let isVisible = true
    let setupData = null
    let observer = null
    let resizeHandler = null
    let visibilityHandler = null

    const prefersReducedMotion = () =>
        window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const createScene = () => {
        const container = containerRef.value
        if (!container) return

        if (!hasWebGL()) {
            webglSupported.value = false
            return
        }

        const mobile = isMobile()
        const width = container.clientWidth
        const height = container.clientHeight

        // Scene
        const s = new THREE.Scene()
        scene.value = s

        // Camera
        const {
            fov = 75,
            near = 0.1,
            far = 1000,
            position = [0, 0, 5],
        } = cameraOptions

        const cam = new THREE.PerspectiveCamera(fov, width / height, near, far)
        cam.position.set(...position)
        camera.value = cam

        // Renderer
        const r = new THREE.WebGLRenderer({
            alpha: true,
            antialias: !mobile,
            powerPreference: mobile ? 'low-power' : 'high-performance',
        })
        r.setSize(width, height)
        r.setPixelRatio(mobile ? 1 : Math.min(window.devicePixelRatio, 2))
        r.setClearColor(0x000000, 0)
        container.appendChild(r.domElement)
        renderer.value = r

        // Clock
        clock = new THREE.Clock()

        // User setup — returns data object accessible in animate
        setupData = setup(s, cam, r) || {}

        // Resize handler
        resizeHandler = () => {
            const w = container.clientWidth
            const h = container.clientHeight
            cam.aspect = w / h
            cam.updateProjectionMatrix()
            r.setSize(w, h)
        }
        window.addEventListener('resize', resizeHandler)

        // Visibility handler — pause when tab hidden
        visibilityHandler = () => {
            isVisible = !document.hidden
            if (isVisible && !animationId) {
                clock.getDelta()
                loop()
            }
        }
        document.addEventListener('visibilitychange', visibilityHandler)

        // IntersectionObserver — pause when off-screen
        observer = new IntersectionObserver(
            ([entry]) => {
                isVisible = entry.isIntersecting
                if (isVisible && !animationId) {
                    clock.getDelta()
                    loop()
                }
            },
            { threshold: 0.05 }
        )
        observer.observe(container)

        // Animation loop
        const loop = () => {
            if (!isVisible || prefersReducedMotion()) {
                animationId = null
                return
            }
            animationId = requestAnimationFrame(loop)
            const delta = clock.getDelta()
            const elapsed = clock.getElapsedTime()
            animate(delta, elapsed, setupData)
            r.render(s, cam)
        }
        loop()
    }

    const destroy = () => {
        const container = containerRef.value
        if (resizeHandler) window.removeEventListener('resize', resizeHandler)
        if (visibilityHandler) document.removeEventListener('visibilitychange', visibilityHandler)
        if (observer) observer.disconnect()
        if (animationId) cancelAnimationFrame(animationId)
        if (setupData?.cleanup) setupData.cleanup()

        const r = renderer.value
        const s = scene.value
        if (r) {
            r.dispose()
            if (container && container.contains(r.domElement)) {
                container.removeChild(r.domElement)
            }
        }
        if (s) {
            s.traverse((obj) => {
                if (obj.geometry) obj.geometry.dispose()
                if (obj.material) {
                    if (Array.isArray(obj.material)) {
                        obj.material.forEach((m) => m.dispose())
                    } else {
                        obj.material.dispose()
                    }
                }
            })
        }
    }

    onMounted(() => {
        createScene()
    })

    onUnmounted(() => {
        destroy()
    })

    return { scene, camera, renderer, webglSupported }
}
