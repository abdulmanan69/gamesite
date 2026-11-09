/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Near-black ramp: a LAN hall with the lights off. The screens bring the colour.
        ink: {
          deep: '#030304',
          bg: '#060608',
          card: '#0e0e12',
          raised: '#17171d',
          hover: '#202028',
        },
        fg: {
          DEFAULT: '#f2f2f5',
          2: '#a9a9b5',
          3: '#76768a',
        },
        line: 'rgba(242, 242, 245, 0.09)',
        accent: {
          DEFAULT: '#ff5b14',
          hover: '#ff7637',
        },
        ok: '#a3ff3c',
        bad: '#ff4d5e',
      },
      fontFamily: {
        display: ['"Big Shoulders Display"', 'Impact', 'sans-serif'],
        sans: ['"Chakra Petch"', 'system-ui', 'sans-serif'],
        mono: ['"Chakra Petch"', 'ui-monospace', 'monospace'],
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        rise: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        live: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.45' },
        },
      },
      animation: {
        rise: 'rise 600ms cubic-bezier(0.22, 1, 0.36, 1) both',
        live: 'live 1.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
