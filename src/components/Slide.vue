<template>
  <figure
    :class="[classes, 'slider__slide']"
    :style="`background-image: url(${source.image})`"
  >
    <!-- <img :src="source.image" class="slider__img" loading="lazy" /> -->
    <button type="button" class="slider__btn-more">{{ source.text }}</button>
  </figure>
</template>

<script>
export default {
  props: {
    source: {
      type: Object,
      required: true
    },
    classes: {
      type: String
    },
    isHideTitle: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      allPhotos: []
    };
  }
};
</script>

<style></style>
