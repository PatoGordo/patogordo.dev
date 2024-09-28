<script lang="ts" setup>
import { TransitionRoot } from "@headlessui/vue";

const { t } = useI18n();

const active = ref(0);

const items = computed(() => [
  {
    name: "PontoDigital",
    imgUrl: "/images/pontodigital-preview.png",
    iconUrl: "/images/pontodigital-icon.png",
    description: t("projects.pontodigital.description"),
    languages: ["pt"],
    livePreview: "https://pontodigital.me",
  },
  {
    name: "GBreath",
    imgUrl: "/images/gbreath-preview.png",
    iconUrl: "/images/gbreath-icon.png",
    description: t("projects.gbreath.description"),
    languages: ["en", "pt"],
    sourceCode: "https://github.com/gbreath",
    livePreview: "https://beta-gbreath.netlify.app",
  },
  {
    name: "RocketLaunches",
    imgUrl: "/images/rocketlaunches-preview.png",
    iconUrl: "/images/rocketlaunches-icon.png",
    description: t("projects.rocketlaunches.description"),
    languages: ["en"],
    sourceCode: "https://github.com/rocket-launches",
    livePreview: "https://rocketlaunches.app",
  },
]);
</script>

<template>
  <div class="w-full max-w-5xl mx-auto text-center">
    <!-- Images -->
    <div class="transition-all duration-150 delay-300 ease-in-out">
      <div class="relative flex flex-col">
        <template :key="index" v-for="(item, index) in items">
          <TransitionRoot
            :show="active === index"
            enter="transition ease-in-out duration-500 delay-200 order-first"
            enterFrom="opacity-0 scale-105"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in-out duration-300 absolute"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <img
              class="rounded-xl border border-gray-700"
              :src="item.imgUrl"
              width="1024"
              height="576"
              :alt="`${$t('projects.preview-alt', {
                project_name: item.name,
              })}`"
            />

            <p class="text-start mt-6">
              {{ item.description }}
            </p>

            <div class="w-full flex items-center justify-start gap-2 mt-6">
              <p class="text-start">
                {{ $t("projects.supported-languages") }}:
              </p>

              <div
                class="flex items-center justify-start gap-2"
                v-if="item.languages.includes('en')"
              >
                <Icon name="circle-flags:us" size="20" />
                <span class="font-bold"> English </span>
              </div>
              <!-- I hope not learning a new language too early -->
              <span v-if="item.languages.length >= 2" class="-ml-2">,</span>
              <div
                class="flex items-center justify-start gap-2"
                v-if="item.languages.includes('pt')"
              >
                <Icon name="circle-flags:br" size="20" />
                <span class="font-bold"> Português </span>
              </div>
            </div>

            <div class="w-full flex items-center justify-start mt-6 gap-4">
              <a
                v-if="item?.sourceCode"
                class="px-4 py-3 bg-secondary-500 text-black font-bold rounded-lg flex items-center justify-center gap-2"
                :href="item?.sourceCode"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="tabler:code" size="24" class="text-black" />
                {{ $t("projects.source-code") }}
              </a>

              <a
                v-if="item?.livePreview"
                class="px-4 py-3 bg-primary-500 text-black font-bold rounded-lg flex items-center justify-center gap-2"
                :href="item?.livePreview"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ $t("projects.try-it-out") }}
                <Icon
                  name="tabler:arrow-up-right"
                  size="24"
                  class="text-black"
                />
              </a>
            </div>
          </TransitionRoot>
        </template>
      </div>
    </div>
    <!-- Items -->
    <div
      class="max-w-xs sm:max-w-sm md:max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
    >
      <template :key="index" v-for="(item, index) in items">
        <button
          class="p-2 rounded focus:outline-none focus-visible:ring focus-visible:ring-indigo-300 group"
          @click="active = index"
        >
          <span class="text-center flex flex-col items-center">
            <span
              class="flex items-center justify-center relative w-9 h-9 rounded-full mb-2"
            >
              <img
                class="rounded-xl"
                :src="item.iconUrl"
                width="1024"
                height="576"
                :alt="`${$t('projects.icons-alt', {
                  project_name: item.name,
                })}`"
              />
            </span>
            <span class="block text-sm font-medium mb-2">{{ item.name }}</span>
            <span
              class="block relative w-full h-1 rounded-full"
              :class="active === index ? 'bg-primary-500' : 'bg-gray-500'"
              role="progressbar"
              aria-valuenow="0"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <span
                class="absolute inset-0 bg-indigo-500 rounded-[inherit]"
                style="width: 0%"
              ></span>
            </span>
          </span>
        </button>
      </template>
    </div>
  </div>
</template>
