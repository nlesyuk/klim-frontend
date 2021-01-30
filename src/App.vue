<template>
  <main id="app" class="container">
    <SvgSprite></SvgSprite>
    <Header></Header>
    <section class="content">
      <router-view />
    </section>
    <Footer></Footer>
  </main>
</template>

<script lang="ts">
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import SvgSprite from "./components/SVG-sprite.vue";

export default {
  components: {
    Header,
    Footer,
    SvgSprite
  }
};
</script>
