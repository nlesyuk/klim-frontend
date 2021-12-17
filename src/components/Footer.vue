<template>
  <footer class="footer">
    <p class="footer__text">
      Klim Stepan. Ukraine based cinematogapher / director of photography
    </p>
    <p class="footer__text" v-if="contacts">
      contact me
      <a :href="`mailto:${contacts.email}`">{{ contacts.email }}</a>
    </p>
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
