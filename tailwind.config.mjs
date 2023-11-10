/** @type {import('tailwindcss').Config} */
import { data } from './src/utils';
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
      white: data[0].themes.white,
      body: data[0].themes.body,
      black: data[0].themes.black,
      primary: data[0].themes.primary,
      placeholder: data[0].themes.placeholder,
      text: data[0].themes.text,
    },
  },
  plugins: [],
};
