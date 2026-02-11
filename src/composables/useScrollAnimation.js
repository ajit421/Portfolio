import { onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Check if user prefers reduced motion
const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Composable for GSAP ScrollTrigger animations.
 * All animations respect prefers-reduced-motion.
 */
export function useScrollAnimation() {
  const triggers = []

  const cleanup = () => {
    triggers.forEach(t => t.kill())
    triggers.length = 0
  }

  onUnmounted(cleanup)

  /**
   * Helper to safely set initial state and animate on scroll.
   * Uses gsap.set + gsap.to pattern instead of gsap.from to avoid
   * elements getting stuck at opacity:0 if ScrollTrigger never fires.
   */
  const safeScrollAnimation = (el, fromVars, toVars, scrollTriggerConfig) => {
    // Set initial hidden state
    gsap.set(el, fromVars)

    const tween = gsap.to(el, {
      ...toVars,
      scrollTrigger: {
        ...scrollTriggerConfig,
        toggleActions: 'play none none none',
        once: true,
      },
    })
    if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
    return tween
  }

  /**
   * Fade-in + slide-up on scroll into view
   */
  const animateOnScroll = (selector, options = {}) => {
    if (prefersReducedMotion()) return
    const {
      y = 60,
      duration = 0.8,
      ease = 'power3.out',
      start = 'top 90%',
      delay = 0,
    } = options

    gsap.utils.toArray(selector).forEach(el => {
      safeScrollAnimation(
        el,
        { y, opacity: 0 },
        { y: 0, opacity: 1, duration, ease, delay },
        { trigger: el, start }
      )
    })
  }

  /**
   * Staggered fade-in for a group of children
   */
  const staggerCards = (parentSelector, childSelector, options = {}) => {
    if (prefersReducedMotion()) return
    const {
      y = 80,
      stagger = 0.1,
      duration = 0.7,
      ease = 'power3.out',
      start = 'top 90%',
      scale = 1,
    } = options

    const parent = document.querySelector(parentSelector)
    if (!parent) return

    const children = parent.querySelectorAll(childSelector)
    if (!children.length) return

    // Set initial hidden state on all children
    gsap.set(children, { y, opacity: 0, scale })

    const tween = gsap.to(children, {
      y: 0,
      opacity: 1,
      scale: 1,
      stagger,
      duration,
      ease,
      scrollTrigger: {
        trigger: parent,
        start,
        toggleActions: 'play none none none',
        once: true,
      },
    })
    if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
  }

  /**
   * Slide-in from the left
   */
  const slideInLeft = (selector, options = {}) => {
    if (prefersReducedMotion()) return
    const { x = -80, duration = 0.8, ease = 'power3.out', start = 'top 90%' } = options

    gsap.utils.toArray(selector).forEach(el => {
      safeScrollAnimation(
        el,
        { x, opacity: 0 },
        { x: 0, opacity: 1, duration, ease },
        { trigger: el, start }
      )
    })
  }

  /**
   * Slide-in from the right
   */
  const slideInRight = (selector, options = {}) => {
    if (prefersReducedMotion()) return
    const { x = 80, duration = 0.8, ease = 'power3.out', start = 'top 90%' } = options

    gsap.utils.toArray(selector).forEach(el => {
      safeScrollAnimation(
        el,
        { x, opacity: 0 },
        { x: 0, opacity: 1, duration, ease },
        { trigger: el, start }
      )
    })
  }

  /**
   * Scale-in animation
   */
  const scaleIn = (selector, options = {}) => {
    if (prefersReducedMotion()) return
    const {
      scale = 0.8,
      duration = 0.6,
      ease = 'back.out(1.7)',
      start = 'top 90%',
      stagger = 0.08,
    } = options

    const elements = gsap.utils.toArray(selector)
    if (!elements.length) return

    // Set initial hidden state
    gsap.set(elements, { scale, opacity: 0 })

    const tween = gsap.to(elements, {
      scale: 1,
      opacity: 1,
      stagger,
      duration,
      ease,
      scrollTrigger: {
        trigger: elements[0],
        start,
        toggleActions: 'play none none none',
        once: true,
      },
    })
    if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
  }

  /**
   * Parallax scroll effect — moves element at a different rate
   */
  const parallax = (selector, options = {}) => {
    if (prefersReducedMotion()) return
    const { y = 100, start = 'top top', end = 'bottom top' } = options

    gsap.utils.toArray(selector).forEach(el => {
      const st = gsap.to(el, {
        y,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start,
          end,
          scrub: true,
        },
      }).scrollTrigger
      if (st) triggers.push(st)
    })
  }

  /**
   * Staggered entrance from alternating sides (for timeline layouts)
   */
  const alternatingSlideIn = (parentSelector, childSelector, options = {}) => {
    if (prefersReducedMotion()) return
    const { duration = 0.8, ease = 'power3.out', start = 'top 90%', distance = 80 } = options

    const parent = document.querySelector(parentSelector)
    if (!parent) return

    const children = parent.querySelectorAll(childSelector)
    children.forEach((el, index) => {
      const x = index % 2 === 0 ? -distance : distance
      safeScrollAnimation(
        el,
        { x, opacity: 0 },
        { x: 0, opacity: 1, duration, ease },
        { trigger: el, start }
      )
    })
  }

  return {
    animateOnScroll,
    staggerCards,
    slideInLeft,
    slideInRight,
    scaleIn,
    parallax,
    alternatingSlideIn,
  }
}
