// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["@nuxtjs/tailwindcss", "nuxt-icon", "@vueuse/nuxt"],
  tailwindcss: {
    cssPath: ["~/assets/scss/tailwind.scss", { injectPosition: "first" }],
    configPath: "./tailwind.config.js",
    viewer: false,
  },
});
