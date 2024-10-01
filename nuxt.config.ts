// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-09-27",
  ssr: false,
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/icon",
    "@vueuse/nuxt",
    "@nuxtjs/i18n",
    "@nuxt/fonts",
    "@vueuse/nuxt",
  ],
  icon: {
    provider: "server",
    clientBundle: {
      scan: true,
    },
  },
  tailwindcss: {
    cssPath: ["~/assets/scss/tailwind.scss", { injectPosition: "first" }],
    configPath: "./tailwind.config.js",
    viewer: false,
  },
  fonts: {
    families: [
      { name: "Inter", provider: "google" },
      { name: "Russo One", provider: "google" },
    ],
  },
  i18n: {
    strategy: "no_prefix",
    detectBrowserLanguage: {
      fallbackLocale: "en",
    },
    langDir: "./i18n/locales",
    locales: [
      {
        code: "en",
        name: "English",
        file: "en.json",
      },
      {
        code: "pt",
        name: "Português",
        file: "pt.json",
      },
    ],
    vueI18n: "./i18n/config.ts",
  },
});
