<template>
  <div class="photos">
    <template v-if="photo">
      <h1>{{ photo.title }}</h1>
      <PhotosGrid :images="photos" />
      <p>{{ photo.credits }}</p>
    </template>
    <Spiner v-else />
  </div>
</template>
<script>
import PhotosGrid from "../components/PhotosGrid";
import { RepositoryFactory } from "./../repositories/RepositoryFactory";
const PhotosRepository = RepositoryFactory.get("photos");

export default {
  components: {
    PhotosGrid
  },
  data() {
    return {
      photo: null
    };
  },
  watch: {
    photo(v) {
      console.log("photo w", v);
    }
  },
  computed: {
    photos() {
      return this.photo ? this.photo.photos : [];
    }
  },
  methods: {},
  async mounted() {
    this.setTitle("Photo");
    try {
      const { data } = await PhotosRepository.getById(+this.$route.params.id);
      console.log("data", data);
      this.photo = data[0];
      this.setTitle(data[0].title);
    } catch (e) {
      console.error(e);
    }
  }
};
</script>
