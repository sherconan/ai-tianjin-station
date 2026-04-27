import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.mdx',
  ],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#1a1a1a', soft: '#2c2418', muted: '#6b6358' },
        paper: { DEFAULT: '#f4ecd8', soft: '#faf3e0', deep: '#e8dcc0' },
        seal: { DEFAULT: '#c0392b', dark: '#9a2620', light: '#e07b6a' },
        gold: { DEFAULT: '#b89764', dark: '#8a6f4a' },
        grade: {
          green: '#3d7a3d',
          yellow: '#d4a017',
          red: '#a31621',
        },
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', '"Source Han Serif"', 'Georgia', 'serif'],
        sans: ['"Noto Sans SC"', '"PingFang SC"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'Menlo', 'monospace'],
      },
      backgroundImage: {
        'paper-grain': "url('/textures/paper.png')",
      },
      boxShadow: {
        archive: '0 1px 0 rgba(0,0,0,0.04), 0 8px 24px -16px rgba(60,40,20,0.25)',
        seal: '0 0 0 2px #c0392b inset',
      },
      borderRadius: {
        archive: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
