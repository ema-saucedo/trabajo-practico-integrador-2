import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite"; //esto es lo que se instala para que funcione tailwindcss con vite.

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],//acá se agrega al plugin de tailwindcss para que funcione con vite
});
