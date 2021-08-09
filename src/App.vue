<template>
  <main id="app" class="container">
    <svg-sprite></svg-sprite>
    <Header></Header>
    <section class="content">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
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
