/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          pink: '#ff00ff',
          cyan: '#00ffff',
          purple: '#9d00ff',
          blue: '#00bfff',
          yellow: '#ffff00',
        },
        // Light Mode Defaults
        'bg-primary': '#f0f4f8',
        'bg-card': '#ffffff',
        'text-primary': '#1e293b',
        'text-secondary': '#64748b',
        'border-neon': '#ff00ff33',
        // Dark Mode - Strong Neon
        'bg-primary-dark': '#0a0a0f',
        'bg-card-dark': '#12121a',
        'text-primary-dark': '#e0e0ff',
        'text-secondary-dark': '#a0a0c0',
        'border-neon-dark': '#ff00ffaa',
      },
      boxShadow: {
        'neon': '0 0 6px #ff00ff, 0 0 10px #ff00ff, 0 0 30px #ff00ff',
        'neon-cyan': '0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff',
        'neon-sm': '0 0 5px #ff00ff, 0 0 10px #ff00ff',
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}

