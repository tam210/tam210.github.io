import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://tam210.github.io",
  base: "/",
  output: "static",
  build: {
    format: "directory",
  },
  compressHTML: true,
  redirects: {
    "/about": "/",
    "/projects": "/cases/",
    "/stack": "/systems/",
    "/process": "/thinking/",
    "/contact": "/connect/",
  },
});
