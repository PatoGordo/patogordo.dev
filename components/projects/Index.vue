<script setup lang="ts"></script>

<template>
  <section id="projects" class="w-full flex flex-col items-center">
    <h3 class="text-xl text-center mb-2 mt-12">
      {{ $t("projects.title") }}
    </h3>

    <p class="text-lg text-center">
      {{ $t("projects.description") }}
    </p>

    <span class="mt-12" />

    <ProjectsCarousel />
  </section>
</template>
