<script lang="ts" setup></script>

<template>
  <main
    class="w-full h-fit py-8 px-72 max-xl:px-32 max-lg:px-24 max-md:px-12 max-sm:px-8"
  >
    <Hero />

    <div class="w-full h-[1px] bg-gray-700 mt-12"></div>

    <Projects />

    <div class="w-full h-[1px] bg-gray-700 mt-12"></div>

    <ContactMe />

    <div class="w-full h-[1px] bg-gray-700 mt-12"></div>

    <h3 class="text-xl text-center mb-2 mt-12">
      ...👷{{ $t("work-in-progress") }}😃...
    </h3>
  </main>
</template>
