<template>
  <figure class="home__post">
    <img :src="src" :alt="title" class="home__post-img" />
    <a class="home__post-title" @click.prevent="goToWork">
      <svg width="24" height="24">
        <use xlink:href="#svg-sprite--video"></use>
      </svg>
      {{ title }}
    </a>
  </figure>
</template>

<script>
export default {
  name: "post",
  props: {
    src: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    id: {
      type: [Number, String],
      required: true
    }
  },
  methods: {
    goToWork() {
      this.$router.push("/work/" + this.id);
    }
  }
};
</script>
