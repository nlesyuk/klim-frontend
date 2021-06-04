<template>
  <figure
    v-if="source.type === 'image'"
    :class="[classes, 'slider__slide']"
    :style="`background-image: url(${source.image})`"
  >
    <!-- <img :src="source.image" class="slider__img" loading="lazy" /> -->
    <button type="button" class="slider__btn-more">{{ source.text }}</button>
  </figure>
  <VimeoVideoPlayer
    v-else-if="source.type === 'video'"
    :class="[classes, 'slider__slide']"
    :previewImg="source.image"
    :id="source.video.vimeo_id"
  />
</template>

<script>
import VimeoVideoPlayer from "../components/VimeoVideoPlayer";

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
  components: {
    VimeoVideoPlayer
  }
};
</script>
