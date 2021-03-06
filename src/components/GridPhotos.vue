<template>
  <div>
    <div
      class="grid-container"
      v-for="(arrImages, idx) in chunkedImages.vertical"
      :key="idx"
    >
      <div
        class="grid-type grid-type--oneline"
        :class="{
          'grid-type--oneline-1': arrImages.length === 1,
          'grid-type--oneline-2': arrImages.length === 2,
          'grid-type--oneline-3': arrImages.length === 3
        }"
      >
        <figure
          v-for="(image, index) in arrImages"
          :key="index"
          class="grid__item"
        >
          <a class="grid__lightbox" :href="image.src">
            <img :src="image.src" alt="" class="grid__img" loading="lazy" />
          </a>
        </figure>
      </div>
    </div>
    <div
      class="grid-container"
      v-for="(arrImages, idx) in chunkedImages.horizontal"
      :key="`0${idx}`"
    >
      <div
        class="grid-type"
        :class="{
          'grid-type--big-on-left': arrImages.length === 3 && (idx + 1) % 2,
          'grid-type--big-on-right': arrImages.length === 3 && !((idx + 1) % 2),
          'grid-type--two': arrImages.length === 2,
          'grid-type--one': arrImages.length === 1
        }"
      >
        <figure
          v-for="(image, index) in arrImages"
          :key="index"
          class="grid__item"
        >
          <a class="grid__lightbox" :href="image.src">
            <img :src="image.src" alt="" class="grid__img" loading="lazy" />
          </a>
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
  data() {
    return {
      lightbox: null
    };
  },
  watch: {
    images(v) {
      if (v.length) {
        this.uninstallLightBox();
        this.installLightBox();
      }
    }
  },
  methods: {
    installLightBox() {
      this.lightbox = new SimpleLightbox({
        elements: ".grid-container .grid__lightbox"
      });
    },
    uninstallLightBox() {
      if (this.lightbox) {
        this.lightbox.destroy();
        this.lightbox = null;
      }
    }
  },
  computed: {
    chunkedImages() {
      if (!this.images.length) return;

      const vertivalImages = this.images.filter(v => v.isVertical);
      const horizontalImages = this.images.filter(v => !v.isVertical);

      return {
        vertical: chunk(vertivalImages, 3),
        horizontal: chunk(horizontalImages, 3)
      };
    }
  },
  mounted() {
    this.installLightBox();
  },
  destroyed() {
    this.uninstallLightBox();
  }
};
</script>
