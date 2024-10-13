<script lang="ts" setup>
import { vOnClickOutside } from "@vueuse/components";
import i18next from "i18next";
import { makeZodI18nMap } from "zod-i18n-map";
import v from "~/config/validate";

const langDropdownOpen = ref(false);

const { locale, setLocale } = useI18n();

const handleOpenLangDropdown = () => {
  langDropdownOpen.value = true;
};

const handleCloseLangDropdown = () => {
  langDropdownOpen.value = false;
};

const handleChangeLang = (newLang: string) => {
  setLocale(newLang);
  handleCloseLangDropdown();
};

watch(locale, (newLocale) => {
  i18next.changeLanguage(newLocale);
  
  v.setErrorMap(makeZodI18nMap({ t: i18next.t }));
});
</script>

<template>
  <div>
    <button
      @click="handleOpenLangDropdown"
      class="relative flex items-center justify-between h-full bg-white px-4 py-1 gap-2 rounded-full"
    >
      <template v-if="locale === 'pt'">
        <div class="flex gap-2">
          <Icon name="circle-flags:br" size="24" />
          <span class="text-black font-bold max-md:hidden max-sm:block">
            Português
          </span>
        </div>
        <Icon
          name="tabler:chevron-down"
          class="!text-black fill-black"
          size="24"
        />
      </template>
      <template v-else>
        <div class="flex gap-2">
          <Icon name="circle-flags:us" size="24" />
          <span class="text-black font-bold max-md:hidden max-sm:block"
            >English</span
          >
        </div>
        <Icon
          name="tabler:chevron-down"
          class="!text-black fill-black"
          size="24"
        />
      </template>
    </button>

    <div
      class="absolute right-72 max-sm:right-auto max-xl:right-32 max-lg:right-24 max-md:right-12 bg-white mt-2 py-3 rounded-lg"
      :class="langDropdownOpen ? 'visible' : 'invisible'"
      v-on-click-outside="handleCloseLangDropdown"
    >
      <ul
        class="w-full flex flex-col items-center justify-center gap-2 cursor-pointer"
      >
        <li
          @click="handleChangeLang('pt')"
          class="w-full flex flex-row items-center justify-between px-4 py-1 gap-2"
        >
          <div class="flex gap-2">
            <Icon name="circle-flags:br" size="24" />
            <span class="text-black font-bold"> Português </span>
          </div>
          <Icon
            v-if="locale === 'pt'"
            name="tabler:circle-check"
            class="text-black"
            size="24"
          />
          <Icon v-else name="tabler:circle" class="text-black" size="24" />
        </li>

        <li
          @click="handleChangeLang('en')"
          class="w-full flex flex-row items-center justify-between px-4 py-1 gap-2"
        >
          <div class="flex gap-2">
            <Icon name="circle-flags:us" size="24" />
            <span class="text-black font-bold">English</span>
          </div>
          <Icon
            v-if="locale === 'en'"
            name="tabler:circle-check"
            class="text-black"
            size="24"
          />
          <Icon v-else name="tabler:circle" class="text-black" size="24" />
        </li>
      </ul>
    </div>
  </div>
</template>
