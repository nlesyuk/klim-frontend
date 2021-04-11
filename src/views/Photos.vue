<template>
  <div class="photos">
    <Spiner v-if="!photos.length" />
    <PhotoPreview
      v-else
      v-for="(photo, idx) in photos"
      :key="idx"
      :collection="photo"
      :collectionType="idx % 2 ? 'left' : 'right'"
    />
  </div>
</template>
<script>
import PhotoPreview from "../components/PhotoPreview";
import { RepositoryFactory } from "./../repositories/RepositoryFactory";
const PhotosRepository = RepositoryFactory.get("photos");

export default {
  components: {
    PhotoPreview
  },
  data() {
    return {
      allPhotos: []
    };
  },
  computed: {
    photos() {
      let res;
      if (this.$route.path.includes("commerce")) {
        res = this.allPhotos.filter(v => v.category.includes("commerce"));
      } else {
        res = this.allPhotos.filter(v => !v.category.includes("commerce"));
      }
      return res.length ? res : this.allPhotos;
    }
  },
  async mounted() {
    this.setTitle("Photos");
    try {
      const { data } = await PhotosRepository.getAll();
      this.allPhotos = data;
    } catch (e) {
      console.error(e);
    }
  }
};
</script>
