<template>
  <figure class="work">
    <img :src="work.preview_img" :alt="work.title" class="work__img" />
    <a class="work__title" @click.prevent="goToWork">
      <svg width="24" height="24">
        <use xlink:href="#svg-sprite--video"></use>
      </svg>
      {{ work.title }}
    </a>
  </figure>
</template>

<script>
export default {
  props: {
    work: {
      type: Object,
      required: true
    }
  },
  methods: {
    goToWork() {
      this.$router.push("/work/" + this.work.id);
    }
  },
  mounted() {
    console.log("work", this.work);
  }
};
</script>
