/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
        daminga: ['Daminga', 'sans-serif'],
      },
      screens: {
        '3xl': '1920px',
      },
      colors: {
        primary: {
          50:  '#f0f4ff',
          100: '#dce8ff',
          200: '#b9d1ff',
          300: '#85b0ff',
          400: '#4d85ff',
          500: '#2563eb',
          600: '#1d4ed8',
          700: '#1e40af',
          800: '#1e3a8a',
          900: '#1e3070',
        },
        sidebar: {
          bg: '#0f172a',
          hover: '#1e293b',
          active: '#1d4ed8',
          text: '#94a3b8',
          activeText: '#ffffff',
          icon: '#64748b',
        },
        surface: {
          bg: '#0f172a',
          card: '#1e293b',
          cardHover: '#263348',
          border: '#334155',
          input: '#1e293b',
        },
        accent: {
          blue:   '#3b82f6',
          purple: '#8b5cf6',
          green:  '#22c55e',
          orange: '#f97316',
          red:    '#ef4444',
          yellow: '#eab308',
          cyan:   '#06b6d4',
        },
      },
      backgroundImage: {
        'gradient-sidebar': 'linear-gradient(180deg, #0f172a 0%, #0d1526 100%)',
        'gradient-card':    'linear-gradient(135deg, #1e293b 0%, #1a2540 100%)',
        'gradient-blue':    'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)',
        'gradient-purple':  'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)',
        'gradient-green':   'linear-gradient(135deg, #15803d 0%, #22c55e 100%)',
        'gradient-orange':  'linear-gradient(135deg, #c2410c 0%, #f97316 100%)',
      },
      boxShadow: {
        'card':    '0 4px 24px rgba(0, 0, 0, 0.3)',
        'glow-blue':   '0 0 20px rgba(37, 99, 235, 0.4)',
        'glow-purple': '0 0 20px rgba(139, 92, 246, 0.4)',
        'sidebar':     '4px 0 24px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        'fade-in':    'fadeIn 0.3s ease-out',
        'slide-in':   'slideIn 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'spin-slow':  'spin 3s linear infinite',
      },
      keyframes: {
        fadeIn:  { from: { opacity: '0', transform: 'translateY(-4px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideIn: { from: { opacity: '0', transform: 'translateX(-12px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
      },
    },
  },
  plugins: [],
};
