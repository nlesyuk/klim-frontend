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

    <Menu class="header__nav" />

    <!--
    <nav class="header__nav">
      <ul>
        <li>
          <router-link
            exact-path
            exact-active-class="active"
            to="/"
            class="header__nav-item"
            >Works</router-link
          >
        </li>
        <li>
          <router-link
            exact-path
            exact-active-class="active"
            to="/shots"
            class="header__nav-item main"
            >Shots</router-link
          >
          <div class="header__dropdown">
            <router-link
              exact
              exact-active-class="active"
              :to="{ path: 'shots', query: { filter: 'all' } }"
              class="header__nav-subitem"
              >all</router-link
            >
            <router-link
              exact-path
              exact-active-class="active"
              :to="{ path: 'shots', query: { filter: 'portrait' } }"
              class="header__nav-subitem"
              >portrait</router-link
            >
            <router-link
              exact-path
              exact-active-class="active"
              :to="{ path: 'shots', query: { filter: 'landscape' } }"
              class="header__nav-subitem"
              >landscape</router-link
            >
            <router-link
              exact-path
              exact-active-class="active"
              :to="{ path: 'shots', query: { filter: 'mood' } }"
              class="header__nav-subitem"
              >mood</router-link
            >
          </div>
        </li>
        <li>
          <router-link
            exact-path
            exact-active-class="active"
            to="/photo"
            class="header__nav-item"
            >Photo</router-link
          >
        </li>
        <li>
          <router-link
            exact-path
            exact-active-class="active"
            to="/contact"
            class="header__nav-item"
            >Contact</router-link
          >
        </li>
      </ul>
    </nav> -->
  </header>
</template>

<script lang="ts">
import Menu from "./menu.vue";

export default {
  name: "Header",
  components: {
    Menu
  }
};
</script>
