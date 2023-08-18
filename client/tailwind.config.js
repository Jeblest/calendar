/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:["Open Sans", "sans-serif"]
      },
      gridTemplateColumns:{
        "1/5": "1fr 5fr"
      },
      colors:{
        "primary":"#D81E5B",
        "secondary":"#8a4efc",
        "dark-alt" : "#202b3e"
      }

    },
  },
  plugins: [],
}

