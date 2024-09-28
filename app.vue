<script setup lang="ts">
const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: "id",
  addSeoAttributes: true,
});
</script>

<template>
  <Html :lang="head.htmlAttrs.lang">
    <Head>
      <!-- SEO & Meta tags -->
      <Title>Ícaro Rocha (Pato)</Title>
    </Head>

    <Body>
      <NuxtPage />
    </Body>
  </Html>
</template>

<style lang="scss">
@import "~/assets/scss/global.scss";
</style>
