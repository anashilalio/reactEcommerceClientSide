/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height:{
        "120" : "30rem",
        '90p': '90%',
      },
      width:{
        "120" : "26rem",
        "130" : "30rem",
        '90p': '90%',
      }
    },
  },
  plugins: [],
}

