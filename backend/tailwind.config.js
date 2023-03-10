/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["../back-office/**/*.{html, js}", "./node_modules/tw-elements/dist/js/**/*.js"],
  theme: {
    extend: {
      backgroundImage: {
        loginBack: "url('/img/loginBack.jpg')",
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
};
