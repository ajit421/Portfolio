import { onMounted, onUnmounted } from 'vue'

/**
 * Composable that applies a 3D perspective tilt effect to elements.
 * Pure CSS transforms — no Three.js dependency.
 *
 * @param {Ref} containerRef - ref to the element to tilt
 * @param {Object} options
 * @param {number} options.maxTilt    - max degrees of rotation (default 8)
 * @param {number} options.scale      - scale factor on hover (default 1.03)
 * @param {number} options.speed      - transition speed in ms (default 400)
 * @param {number} options.glareOpacity - max glare opacity (default 0.15)
 * @param {boolean} options.glare     - whether to show glare effect (default true)
 */
export function use3DTilt(containerRef, options = {}) {
    const {
        maxTilt = 8,
        scale = 1.03,
        speed = 400,
        glareOpacity = 0.15,
        glare = true,
    } = options

    let el = null
    let glareEl = null
    let rafId = null

    const prefersReducedMotion = () =>
        window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const onMouseMove = (e) => {
        if (prefersReducedMotion()) return

        const rect = el.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const rotateX = ((y - centerY) / centerY) * -maxTilt
        const rotateY = ((x - centerX) / centerX) * maxTilt

        if (rafId) cancelAnimationFrame(rafId)
        rafId = requestAnimationFrame(() => {
            el.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale3d(${scale}, ${scale}, ${scale})
      `

            if (glareEl) {
                const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI) + 180
                const dist = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2)
                const maxDist = Math.sqrt(centerX ** 2 + centerY ** 2)
                const opacity = (dist / maxDist) * glareOpacity

                glareEl.style.background = `
          linear-gradient(${angle}deg,
            rgba(255,255,255,${opacity}) 0%,
            transparent 80%)
        `
            }
        })
    }

    const onMouseLeave = () => {
        if (rafId) cancelAnimationFrame(rafId)
        el.style.transition = `transform ${speed}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`
        el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'

        if (glareEl) {
            glareEl.style.background = 'transparent'
        }

        setTimeout(() => {
            if (el) el.style.transition = ''
        }, speed)
    }

    const onMouseEnter = () => {
        el.style.transition = `transform ${speed * 0.5}ms ease-out`
        setTimeout(() => {
            if (el) el.style.transition = ''
        }, speed * 0.5)
    }

    onMounted(() => {
        el = containerRef.value
        if (!el || prefersReducedMotion()) return

        el.style.transformStyle = 'preserve-3d'
        el.style.willChange = 'transform'

        // Create glare element
        if (glare) {
            glareEl = document.createElement('div')
            glareEl.style.cssText = `
        position: absolute;
        top: 0; left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        border-radius: inherit;
        z-index: 10;
      `
            el.style.position = el.style.position || 'relative'
            el.appendChild(glareEl)
        }

        el.addEventListener('mousemove', onMouseMove)
        el.addEventListener('mouseleave', onMouseLeave)
        el.addEventListener('mouseenter', onMouseEnter)
    })

    onUnmounted(() => {
        if (!el) return
        el.removeEventListener('mousemove', onMouseMove)
        el.removeEventListener('mouseleave', onMouseLeave)
        el.removeEventListener('mouseenter', onMouseEnter)
        if (glareEl && el.contains(glareEl)) {
            el.removeChild(glareEl)
        }
    })
}
