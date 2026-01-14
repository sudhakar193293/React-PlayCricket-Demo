import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from 'path';
 
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.NODE_ENV":
    JSON.stringify("production"),
    process:{}
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/components/index.jsx'),
      name: "ReactHeader",                 // 👈 global variable
      formats: ["umd"],              // 👈 UMD enabled
      fileName: () => "react-header.umd.js"
    },
 
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM"
        }
      }
    },
    cssCodeSplit: false
  }
});