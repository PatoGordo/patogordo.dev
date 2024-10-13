import i18next from "i18next";
import { z as v } from "zod";
import { makeZodI18nMap } from "zod-i18n-map";
import pt from "zod-i18n-map/locales/pt/zod.json";
import en from "zod-i18n-map/locales/en/zod.json";

i18next.init({
  lng: "pt",
  resources: {
    pt: {
      zod: {
        ...pt,
      },
    },
    en: {
      zod: {
        ...en,
      },
    },
  },
});

v.setErrorMap(makeZodI18nMap({ t: i18next.t }));

export default v;
