/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#cc785c',
          active: '#a9583e',
          disabled: '#e6dfd8',
        },
        ink: {
          DEFAULT: '#141413',
          strong: '#252523',
        },
        body: {
          DEFAULT: '#3d3d3a',
          strong: '#252523',
        },
        muted: {
          DEFAULT: '#6c6a64',
          soft: '#8e8b82',
        },
        hairline: {
          DEFAULT: '#e6dfd8',
          soft: '#ebe6df',
        },
        canvas: {
          DEFAULT: '#faf9f5',
        },
        surface: {
          soft: '#f5f0e8',
          card: '#efe9de',
          'cream-strong': '#e8e0d2',
          dark: '#181715',
          'dark-elevated': '#252320',
          'dark-soft': '#1f1e1b',
        },
        accent: {
          teal: '#5db8a6',
          amber: '#e8a55a',
          coral: '#cc785c',
        },
        state: {
          success: '#5db872',
          warning: '#d4a017',
          error: '#c64545',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Newsreader', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'card-soft': '0 1px 3px rgba(20, 20, 19, 0.04), 0 1px 2px rgba(20, 20, 19, 0.02)',
        'card-hover': '0 4px 12px rgba(20, 20, 19, 0.06), 0 1px 3px rgba(20, 20, 19, 0.04)',
        'drawer': '-8px 0 24px rgba(20, 20, 19, 0.08)',
      },
      letterSpacing: {
        'tight-display': '-0.5px',
        'tighter-display': '-1px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
