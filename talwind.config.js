/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Use 'Inter' font or other clean, modern font
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      // Custom colors if needed, adhering to soft/modern gradients theme
      colors: {
        'habit-primary': '#4f46e5', // Example soft violet
        'habit-secondary': '#10b981', // Example mint green
      }
    },
  },
  // --- DaisyUI Configuration ---
  plugins: [require('daisyui')],
  
  // DaisyUI Theme Configuration (Use soft and modern themes)
  daisyui: {
    themes: [
      "light",    // Default light theme
      "dark",     // Default dark theme
      "cupcake",  // Soft pastels, highly recommended for a motivational feel
      "emerald",  // Clean, fresh green/blue tones
      "pastel",   // Light, muted colors
    ],
    darkTheme: "dark", // Ensures a default dark mode switch
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: true,
  },
}