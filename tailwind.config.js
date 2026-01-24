
/** @type {import('tailwindcss').Config} */
module.exports = {
   assets: ['./assets/fonts/'],
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          main: "#0141C5",
          light1: "#E6ECFA",
          light2: "#CCD9F5",
          light3: "#99B3EB",
          light4: "#668DE0",
          light5: "#3358D6",
        },

        secondary: {
          main: "#3ACBE8",
          light1: "#E6F8FC",
          light2: "#CFF1F8",
          light3: "#9FE3F1",
          light4: "#6FD5EA",
        },

        action: {
          purpleDark: "#780078",
          purpleLight: "#4C0099",
          green: "#006900",
          red: "#963939",
        },

        actionLight: {
          purple1: "#F2E7F2",
          purple2: "#E9E3F0",
          green: "#DBECDB",
          red: "#ECDBDB",
        },

        gray: {
          black: "#000000",
          dark: "#4D4D4D",
          medium: "#DBDBDB",
          light: "#E6E6E6",
          extraLight: "#FAFAFA",
          white: "#FFFFFF",
        },

        text: {
          primary: "#000000",
          secondary: "#4D4D4D",
        },

        background: {
          default: "#FAFAFA",
        },
      },
      fontFamily: {
        inter: ["Inter"],
      },
      fontWeight: {
        regular: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },

      fontSize: {
        h1: ["20px", { lineHeight: "26px" }],
        h2: ["18px", { lineHeight: "24px" }],
        h3: ["16px", { lineHeight: "22px" }],
        h4: ["15px", { lineHeight: "21px" }],
        h5: ["15px", { lineHeight: "20px" }],
        h6: ["14px", { lineHeight: "19px" }],
        body1: ["14px", { lineHeight: "21px" }],
        body2: ["14px", { lineHeight: "19px" }],
        small: ["13px", { lineHeight: "18px" }],
        caption: ["12px", { lineHeight: "16px" }],
      },
    },
  },
  plugins: [],
};
