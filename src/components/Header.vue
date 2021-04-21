<template>
  <header class="header">
    <ul class="header__social">
      <li>
        <a :href="contacts.facebook"
          ><svg width="24" height="24" viewBox="0 0 24 24">
            <use xlink:href="#svg-sprite--facebook"></use></svg
        ></a>
      </li>
      <li>
        <a :href="contacts.instagram"
          ><svg width="24" height="24" viewBox="0 0 24 24">
            <use xlink:href="#svg-sprite--instagram"></use></svg
        ></a>
      </li>
      <li>
        <a :href="contacts.vimeo"
          ><svg width="24" height="24" viewBox="0 0 24 24">
            <use xlink:href="#svg-sprite--vimeo"></use></svg
        ></a>
      </li>
    </ul>

    <router-link class="header__logo" :to="{ path: '/' }">
      <img src="@/assets/logo.png" alt="logo" />
    </router-link>

    <Nav class="header__nav" />
  </header>
</template>

<script lang="ts">
import Nav from "./Nav.vue";
import { mapState } from "vuex";

export default {
  components: {
    Nav
  },
  computed: {
    ...mapState({
      contacts: state => state.general.contacts
    })
  }
};
</script>
