<template>
  <div>
    <div
      class="grid-container"
      v-for="(arrImages, idx) in chunkedImages"
      :key="idx"
    >
      <!-- 1 2-->
      <div
        class="grid-type grid-type--big-on-left"
        v-if="arrImages.length === 3 && (idx + 1) % 2"
      >
        <figure
          v-for="(image, index) in arrImages"
          :key="index"
          class="grid__item"
        >
          <img :src="image.src" alt="" class="grid__img" />
        </figure>
      </div>
      <div
        class="grid-type grid-type--big-on-right"
        v-else-if="arrImages.length === 3"
      >
        <figure
          v-for="(image, index) in arrImages"
          :key="index"
          class="grid__item"
        >
          <img :src="image.src" alt="" class="grid__img" />
        </figure>
      </div>
      <!-- 3 -->
      <div class="grid-type grid-type--two" v-else-if="arrImages.length === 2">
        <figure
          v-for="(image, index) in arrImages"
          :key="index"
          class="grid__item"
        >
          <img :src="image.src" alt="" class="grid__img" />
        </figure>
      </div>
      <!-- 4 -->
      <div class="grid-type grid-type--one" v-else-if="arrImages.length === 1">
        <figure
          v-for="(image, index) in arrImages"
          :key="index"
          class="grid__item"
        >
          <img :src="image.src" alt="" class="grid__img" />
        </figure>
      </div>
    </div>
  </div>
</template>

<script>
import { chunk } from "lodash";

export default {
  props: {
    images: {
      type: Array,
      required: true
    }
  },
  computed: {
    chunkedImages() {
      if (!this.images.length) return;
      return chunk(this.images, 3);
    }
  }
};
</script>
