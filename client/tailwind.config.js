/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        customBG :'white',
        customHead : 'gray-900',
        customPara : '#939ca3'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

