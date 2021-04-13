<template>
  <div class="not-found">
    <h2 class="not-found__code glitch" data-text="404">404</h2>
    <h1 class="not-found__text">Page not found</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.setTitle("Not found");
  }
};
</script>
