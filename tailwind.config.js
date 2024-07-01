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
        "130" : "36rem",
      },
      width:{
        "120" : "26rem",
        "130" : "30rem",
        '90p': '90%',
        "150" : "36",
      },
      left:{
        "120" : "26rem",
        "130" : "30rem",
        '90p': '90%',
      },
      animation: {
        bounce200: 'bounce 1s infinite 200ms',
        spin: 'spin 1s linear infinite',
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(-25%)', animationTimingFunction: 'cubic-bezier(0.8,0,1,1)' },
          '50%': { transform: 'none', animationTimingFunction: 'cubic-bezier(0,0,0.2,1)' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
}

