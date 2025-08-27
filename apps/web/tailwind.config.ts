import type { Config } from 'tailwindcss'
export default {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}','./components/**/*.{ts,tsx}'],
  theme: { extend: { colors:{ gold:'#d4af37', bg:'#0d0d0d', card:'#1a1a1a' }, borderRadius:{ '2xl':'1rem' } } },
  plugins: []
} satisfies Config
