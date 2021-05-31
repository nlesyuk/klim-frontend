<template>
  <router-link
    :class="['photo-preview', classes]"
    :to="{ path: '/photo/' + collection.id }"
  >
    <div class="grid-container">
      <div
        :class="[
          'grid-type',
          {
            'grid-type--big-on-left': collectionType === 'left' && !isVertical
          },
          {
            'grid-type--big-on-right': collectionType === 'right' && !isVertical
          },
          { 'grid-type--oneline': isVertical }
        ]"
      >
        <figure
          class="grid__item"
          v-for="(image, index) in photos"
          :key="index"
        >
          <img :src="image.src" class="grid__img" loading="lazy" />
        </figure>
      </div>
    </div>
    <h2 v-if="collection.title && !isHideTitle" class="photo-preview__title">
      {{ collection.title }}
    </h2>
  </router-link>
</template>
<script>
export default {
  props: {
    collection: {
      type: Object,
      required: true
    },
    collectionType: {
      type: String,
      default: "left"
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
  },
  computed: {
    photos() {
      const allPreviewPhotos = this.collection.photos.filter(v => v.isPreview);
      return allPreviewPhotos.length ? allPreviewPhotos.slice(0, 3) : [];
    },
    isVertical() {
      return this.photos.every(v => v.isVertical);
    }
  }
};
</script>
