/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                colosseum: {
                    black: '#050505', // Base background
                    card: '#0c0f14', // Surfaces
                    border: '#1a1f24', // Subtle borders
                    green: {
                        DEFAULT: '#18d1a0', // Accent neon green
                        dark: '#0f7a63', // Button fill
                        dim: '#0c3c2f',
                    },
                    text: {
                        DEFAULT: '#f7f9fb',
                        muted: '#9aa3ad',
                    },
                },
            },
            fontFamily: {
                sans: ['Sora', 'Inter', 'sans-serif'],
                mono: ['Roboto Mono', 'monospace'],
            },
            backgroundImage: {
                'grid-pattern': "linear-gradient(to right, #111 1px, transparent 1px), linear-gradient(to bottom, #111 1px, transparent 1px)",
            },
            backgroundSize: {
                'grid-pattern': '40px 40px',
            },
            boxShadow: {
                'neon': '0 0 15px rgba(0, 209, 140, 0.2)',
                'neon-strong': '0 0 20px rgba(0, 209, 140, 0.4)',
            }
        },
    },
    plugins: [],
}
