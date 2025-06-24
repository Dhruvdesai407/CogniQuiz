/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx.tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Default (Cyan) Theme Variables
        'bg-primary': 'var(--color-bg-primary, #1A1A2E)',
        'bg-secondary': 'var(--color-bg-secondary, #1F2840)',
        'text-light': 'var(--color-text-light, #E0E0FF)',
        'text-dark': 'var(--color-text-dark, #C0C0D0)',
        'accent-cyan': 'var(--color-accent-cyan, #00BCD4)',
        'accent-cyan-dark': 'var(--color-accent-cyan-dark, #0097A7)',
        'success-green': 'var(--color-success-green, #4CAF50)',
        'error-red': 'var(--color-error-red, #FF5252)',
        'border-subtle': 'var(--color-border-subtle, #3C486B)',
        'input-bg': 'var(--color-input-bg, #283556)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        'default': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'md': '0 6px 12px rgba(0, 0, 0, 0.15)',
        'lg': '0 10px 20px rgba(0, 0, 0, 0.2)',
        'xl': '0 15px 30px rgba(0, 0, 0, 0.25)',
        '2xl': '0 20px 40px rgba(0, 0, 0, 0.3)',
        '3xl': '0 25px 50px rgba(0, 0, 0, 0.4)',
      },
      keyframes: {
        fadeInOut: {
          '0%': { opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        popIn: {
          '0%': { opacity: '0', transform: 'scale(0.9) translateY(20px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        timerPulse: {
            '0%, 100%': { transform: 'scale(1)', color: 'var(--color-error-red)' },
            '50%': { transform: 'scale(1.05)', color: 'rgba(255, 82, 82, 0.7)' }, // Use rgba for pulse on error-red
        },
      },
      animation: {
        'fade-in-out': 'fadeInOut 4s ease-in-out infinite',
        'pop-in': 'popIn 0.5s ease-out forwards',
        'timer-pulse': 'timerPulse 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};