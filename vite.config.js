import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import {resolve} from "path";

const globalScss = resolve(__dirname, "./src/assets/sass/global");

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/sass/global";\n`
      },
    },
  },
});
