/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Light mode palette
                primary: '#2563EB', // Blue 600
                background: '#FFFFFF',
                surface: '#F5F5F5',

                // Dark mode palette
                'dark-background': '#0F172A', // Slate 900
                'dark-surface': '#1E293B',    // Slate 800
                'dark-primary': '#3B82F6',    // Blue 500
                'accent-success': '#10B981',  // Emerald 500
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            screens: {
                'xs': '320px',
                'sm': '768px',  // Overriding default sm
                'md': '1024px', // Overriding default md
                'lg': '1440px', // Overriding default lg
            },
        },
    },
    plugins: [],
    darkMode: 'class', // Enable manual dark mode toggle
}
