/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    container: {
      center: true,
      padding: '20px',
    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {},
    colors: {
      body: '#FFF',
      primary: '#4B94F7',
      placeholder: '#F5F5F5',
      text: '#434343',
    },
  },
  plugins: [],
};
