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
        active:
          "linear-gradient(135deg, hsl(192, 100%, 67%) 0%, hsl(280, 87%, 65%) 50%)",
      },
      container: {
        center: true,
        padding: "2rem",
      },
      colors: {
        active: "hsl(220, 98%, 61%)",

        bgLight: "hsl(0, 0%, 98%)",
        bgDark: "hsl(235, 21%, 11%)",

        mainBgLight: "hsl(0, 0%, 100%)",
        mainBgDark: "hsl(235, 24%, 19%)",

        textInputLight: "hsl(236, 9%, 61%)",
        textInputDark: "hsl(234, 11%, 52%)",

        notActiveLight: "hsl(233, 11%, 84%)",
        notActiveDark: "hsl(235, 19%, 35%)",

        textTodoLight: "hsl(233, 14%, 35%)",
        textTodoDark: "hsl(234, 39%, 85%)",

        hoverLight: "hsl(235, 10%, 40%)",
        hoverDark: "hsl(236, 33%, 92%)",
      },
    },
    fontFamily: {
      //font-family: "Josefin Sans", sans-serif;
      josefin: ["Josefin Sans", "sans-serif"],
    },
  },
  plugins: [],
};

/*
    colors: {
      brightBlue: "hsl(220, 98%, 61%)",

      MLight: "hsl(0, 0%, 98%)",
      mVD: "hsl(235, 21%, 11%)",

      light: "hsl(233, 11%, 84%)",
      vDark: "hsl(236, 9%, 61%)",
      dark: "hsl(235, 19%, 35%)",

      vDesaturatedD: "hsl(235, 24%, 19%)",
      lightD: "hsl(234, 39%, 85%)",
      lightHD: "hsl(236, 33%, 92%)", // (hover)
      darkD: "hsl(234, 11%, 52%)",
      vD: "hsl(233, 14%, 35%)",
      transparent: "transparent",
      error: "red",
    },
*/
