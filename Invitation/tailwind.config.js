module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        float: {
          "0%": { transform: "translateY(100vh)", opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { transform: "translateY(-10vh)", opacity: "0" },
        },
        blast: {
          "0%": { transform: "translateY(0) scale(1)", opacity: "1" },
          "100%": { transform: "translateY(-100vh) scale(0.5)", opacity: "0" },
        },
        gradientText: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        float: "float 8s linear infinite",
        blast: "blast 2s ease-out forwards",
        "gradient-text": "gradientText 3s linear infinite",
      },
    },
  },
  plugins: [],
};
