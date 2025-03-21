/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'color-hover': '#e8dcb5', 
      },
      animation: {
        'spin-slow': 'spin 2s linear infinite', // Animación personalizada
        'scroll-text': 'scrollText 5s linear infinite', // Animación de desplazamiento
      },
      keyframes: {
        scrollText: {
          '0%': { transform: 'translateX(0%)' }, // Inicia desde la posición original
          '100%': { transform: 'translateX(-100%)' }, // Desplaza el texto completamente a la izquierda
        },
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
  ],
};