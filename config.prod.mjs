import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  base: "./",
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          phaser: ["phaser"],
        },
      },
    },
    minify: "terser",
    terserOptions: {
      compress: {
        passes: 2,
      },
      mangle: true,
      format: {
        comments: false,
      },
    },
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: "assets", // Source folder relative to the project root
          dest: "assets", // Destination folder in the dist directory
        },
      ],
    }),
  ],
});
