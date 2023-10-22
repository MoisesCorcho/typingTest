/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/*.{html,js,php}',
  './src/**/*.{html,js,php}',
],
  theme: {
    extend: {
      // Clases extendidas para espaciado relativo a la pantalla
      spacing: {
        '5p': '5%',
        '10p': '10%',
        // Agrega más clases personalizadas según tus necesidades
      },
    },
  },
  plugins: [],
}

