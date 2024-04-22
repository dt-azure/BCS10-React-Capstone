/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        "1/2-screen": "50vh",
        "30-screen": "30vw",
        "50-screen": "50vw",
        "70-screen": "70vh",
        "80-screen": "80vh",
      },
      width: {
        "50-screen": "50vw",
        "70-screen": "70vw",
        "80-screen": "80vw",
        "1/4": "25%",
      },
      maxWidth: {
        "screen-95vw": "95vw",
      },
      margin: {
        "1/5": "20%",
      },
    },
    container: {
      center: true,
      screens: {
        sm: "540px",
        md: "655px",
        lg: "836px",
        xl: "1080px",
        "2xl": "1280px",
      },
    },
  },
  plugins: [],
};
