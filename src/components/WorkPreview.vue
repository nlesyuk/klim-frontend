<template>
  <router-link
    tag="figure"
    class="work"
    :to="{ path: '/work/' + work.id }"
    :style="`background-image: url(${previewPhoto})`"
  >
    <slot name="default"></slot>
    <!-- <img :src="work.preview_img" :alt="work.title" class="work__img" /> -->
    <div class="work__description">
      <svg width="24" height="24">
        <use xlink:href="#svg-sprite--video"></use>
      </svg>
      <h2 class="work__title">{{ work.title }}</h2>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    work: {
      type: Object,
      required: true
    }
  },
  computed: {
    previewPhoto() {
      const res = this.work.photos.filter(v => v.isPreview);
      return res.length ? res[0].src : "";
    }
  }
};
</script>
