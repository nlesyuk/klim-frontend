<template>
  <div>
    <div
      class="grid-container"
      v-for="(arrImages, idx) in chunkedImages"
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
          <ul class="dashboard__list" v-if="isManage">
            <li>
              <span class="dashboard__badge badge-green m0">
                id: {{ image.id }}
              </span>
            </li>
            <li>
              <button type="button" @click.prevent="remove(image.id)">
                Remove
              </button>
            </li>
            <li>
              <button type="button" @click.prevent="edit(image.id)">
                Edit
              </button>
            </li>
          </ul>

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
    },
    isManage: {
      type: Boolean,
      default: false
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
    },
    remove(id) {
      this.$emit("removeImg", id);
    },
    edit(id) {
      this.$emit("editImg", id);
    }
  },
  computed: {
    chunkedImages() {
      if (!this.images.length) return;
      return chunk(this.images, 3);
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.installLightBox();
    });
  },
  destroyed() {
    this.uninstallLightBox();
  }
};
</script>
