<template>
  <header class="header">
    <ul class="header__social">
      <li>
        <a href="#"
          ><svg width="24" height="24" viewBox="0 0 24 24">
            <use xlink:href="#svg-sprite--facebook"></use></svg
        ></a>
      </li>
      <li>
        <a href="#"
          ><svg width="24" height="24" viewBox="0 0 24 24">
            <use xlink:href="#svg-sprite--instagram"></use></svg
        ></a>
      </li>
      <li>
        <a href="#"
          ><svg width="24" height="24" viewBox="0 0 24 24">
            <use xlink:href="#svg-sprite--vimeo"></use></svg
        ></a>
      </li>
    </ul>

    <a href="/" class="header__logo">
      <img src="@/assets/logo.png" alt="logo" />
    </a>

    <Nav class="header__nav" />
  </header>
</template>

<script lang="ts">
import Nav from "./Nav.vue";

export default {
  name: "Header",
  components: {
    Nav
  }
};
</script>
