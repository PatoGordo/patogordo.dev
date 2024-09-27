<script lang="ts" setup></script>

<template>
  <div
    id="#about"
    class="w-full flex max-sm:flex-col flex-row items-center justify-start gap-8"
  >
    <img
      src="~/assets/images/fuça.jpeg"
      :alt="$t('profile.photo-alt')"
      class="!w-32 !h-32 bg-base-100 rounded-full select-none"
    />

    <div class="flex flex-col items-start justify-center gap-4">
      <h2 class="text-xl max-sm:text-center text-start font-semibold text-white">
        {{ $t("profile.hello-i-am.title") }}
        <span class="text-xl text-secondary font-semibold">Ícaro Rocha</span>, {{ $t("profile.datails") }}
      </h2>

      <div class="flex item-center flex-wrap max-sm:justify-center w-full justify-start gap-8">
        <a
          class="flex items-center justify-center gap-2"
          href="https://github.com/patogordo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <icon name="ri:github-fill" size="24" />
          <span class="font-semibold underline underline-offset-2">GitHub</span>
        </a>

        <a
          class="flex items-center justify-center gap-2"
          href="https://www.linkedin.com/in/icaromiguel/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <icon name="skill-icons:linkedin" size="24" />
          <span class="font-semibold underline underline-offset-2"
            >LinkedIn</span
          >
        </a>

        <nuxt-link
          class="flex items-center justify-center gap-2"
          href="/#contact-me"
        >
          <icon name="uil:envelope-alt" size="24" />
          <span class="font-semibold underline underline-offset-2"
            >{{ $t("profile.contact-me") }}</span
          >
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
