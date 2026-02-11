/**
 * Material Design ripple effect composable.
 * Usage: const { createRipple } = useRipple()
 * Then: @click="createRipple($event)"
 */
export function useRipple() {
    const createRipple = (event) => {
        const button = event.currentTarget
        if (!button) return

        // Ensure relative positioning for the ripple
        const position = getComputedStyle(button).position
        if (position === 'static') {
            button.style.position = 'relative'
        }
        button.style.overflow = 'hidden'

        const ripple = document.createElement('span')
        ripple.classList.add('ripple-effect')

        const rect = button.getBoundingClientRect()
        const size = Math.max(rect.width, rect.height) * 2
        ripple.style.width = ripple.style.height = `${size}px`
        ripple.style.left = `${event.clientX - rect.left - size / 2}px`
        ripple.style.top = `${event.clientY - rect.top - size / 2}px`

        button.appendChild(ripple)
        setTimeout(() => ripple.remove(), 700)
    }

    return { createRipple }
}
