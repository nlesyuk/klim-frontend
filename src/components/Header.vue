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

    <nav class="header__nav">
      <router-link exact-path exact-active-class="active" to="/"
        >Home</router-link
      >
      <router-link exact-path exact-active-class="active" to="/shots"
        >Shots</router-link
      >
      <router-link exact-path exact-active-class="active" to="/photo"
        >Photo</router-link
      >
      <router-link exact-path exact-active-class="active" to="/contact"
        >Contact</router-link
      >
    </nav>
  </header>
</template>

<script lang="ts">
export default {
  name: "Header"
};
</script>
