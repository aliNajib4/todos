/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        base: "18px",
      },
      backgroundImage: {
        mBg: "url('./assets/images/bg-mobile-light.jpg')",
        mBgD: "url('./assets/images/bg-mobile-dark.jpg')",
        bg: "url('./assets/images/bg-desktop-light.jpg')",
        bgD: "url('./assets/images/bg-desktop-dark.jpg')",
        active:
          "linear-gradient(135deg, rgba(87,221,255,1) 0%, rgba(192,88,243,1) 50%)",
      },
      container: {
        center: true,
        padding: "2rem",
      },
    },
    colors: {
      brightBlue: "hsl(220, 98%, 61%)",
      checkBackground1: "hsl(192, 100%, 67%)",
      checkBackground2: "hsl(280, 87%, 65%)",

      MLight: "hsl(0, 0%, 98%)",
      light: "hsl(233, 11%, 84%)",
      vDark: "hsl(236, 9%, 61%)",
      dark: "hsl(235, 19%, 35%)",

      mVD: "hsl(235, 21%, 11%)",
      vDesaturatedD: "hsl(235, 24%, 19%)",
      lightD: "hsl(234, 39%, 85%)",
      lightHD: "hsl(236, 33%, 92%)", // (hover)
      darkD: "hsl(234, 11%, 52%)",
      vD: "hsl(233, 14%, 35%)",
      transparent: "transparent",
      error: "red",
    },
    fontFamily: {
      //font-family: "Josefin Sans", sans-serif;
      josefin: ["Josefin Sans", "sans-serif"],
    },
  },
  plugins: [],
};
