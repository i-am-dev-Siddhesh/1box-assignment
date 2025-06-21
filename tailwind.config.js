module.exports = {
   content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#42497B',     // Deep navy purple
          deep: '#130061',     // Royal blue
          primary: '#00A3ED',  // Vibrant azure
          accent: '#0137D5',   // Bright cobalt
          sky: '#4EBFF2'  
        },
        neutral: {
          light: '#9FA3BC',    // Soft lavender gray
        },
        status: {
          success: '#03BA8A',  // Teal green
        }
      }
    }
  }
}