<template>
  <div>
    <!-- grid module -->
    <div class="grid-container">
      <div
        :class="[
          'grid-type',
          { 'grid-type--big-on-left': collectionType === 'left' },
          { 'grid-type--big-on-right': collectionType === 'right' }
        ]"
      >
        <figure
          class="grid__item"
          v-for="(image, index) in photos"
          :key="index"
        >
          <img :src="image.src" class="grid__img" />
        </figure>
      </div>
    </div>
    <router-link
      v-if="collection.title"
      class="photo-preview__title"
      :to="{ path: '/photo/' + collection.id }"
    >
      {{ collection.title }}
    </router-link>
  </div>
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
    }
  },
  data() {
    return {
      allPhotos: []
    };
  },
  computed: {
    photos() {
      return this.collection.photos.filter(v => v.isPreview);
    }
  }
};
</script>
