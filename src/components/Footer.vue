<template>
  <footer class="footer">
    <p class="footer__text">
      Klim Stepan. Ukraine based cinematogapher / director of photography
    </p>
    <p class="footer__text">
      contact me
      <a :href="`mailto:${contacts.email}`">{{ contacts.email }}</a>
    </p>
    <a href="#" class="dev-author">created by @NazarDevux</a>
  </footer>
</template>

<script lang="ts">
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      contacts: (state?: any) => state.general.contacts
    })
  }
};
</script>
