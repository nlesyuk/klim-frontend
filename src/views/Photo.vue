<template>
  <div class="photos">
    <GridPhotos v-if="photo && photo.photos.length" :images="photo.photos" />
    <Spiner v-else />
  </div>
</template>
<script>
import GridPhotos from "../components/GridPhotos";
import { RepositoryFactory } from "./../repositories/RepositoryFactory";
const PhotosRepository = RepositoryFactory.get("photos");

export default {
  components: {
    GridPhotos
  },
  data() {
    return {
      photo: null
    };
  },
  async mounted() {
    this.setTitle("Photo");
    try {
      const { data } = await PhotosRepository.getPhoto(+this.$route.params.id);
      this.photo = data;
    } catch (e) {
      console.error(e);
    }
  }
};
</script>
