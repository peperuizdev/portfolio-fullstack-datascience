import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Verde Bosque Vibrante
        background: '#059669',
        foreground: '#ffffff',
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#059669',
          600: '#047857',
          700: '#065f46',
        },
        // Colores específicos para el diseño
        'project-title': '#000000', // Negro para títulos de proyectos
        'project-date': '#ffffff', // Blanco para fechas
        // Grises personalizados para otras secciones
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        // Colores básicos
        black: '#000000',
        white: {
          DEFAULT: '#ffffff',
          warm: '#FAFAFA', 
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config