import i18next from "i18next";
import { z as v } from "zod";
import { makeZodI18nMap } from "zod-i18n-map";
import translation from "zod-i18n-map/locales/pt/zod.json";

i18next.init({
  lng: "pt",
  resources: {
    pt: {
      zod: {
        ...translation,
      },
    },
  },
});

v.setErrorMap(makeZodI18nMap({ t: i18next.t }));

export default v;
