<template>
  <Html>
    <Head>
      <!-- SEO & Meta tags -->
      <Title>PatoGordo</Title>

      <!-- Fonts -->
      <Link rel="preconnect" href="https://fonts.googleapis.com" />
      <Link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossorigin="anonymous"
      />
      <Link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
        rel="stylesheet"
      />
      <Link
        href="https://fonts.googleapis.com/css2?family=Russo+One&display=swap"
        rel="stylesheet"
      />
    </Head>

    <Body>
      <nuxt-layout>
        <nuxt-page />
      </nuxt-layout>
    </Body>
  </Html>
</template>

<style lang="scss">
@import "~/assets/scss/global.scss";
</style>
