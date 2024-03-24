/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "yellow-1": "#F8F4EB",
        "yellow-2":"#fcda02",
        "light-1": "#EFEFEF",
        "light-2": "#F5F5F5",
        "dark-1": "#111517",
        "dark-2": "#1B2A2F",
        "dark-3": "#262626",
      },
    },
  },
  plugins: [],
}