<template>
  <div class="photos">
    <template v-if="photos && photos.length">
      <PhotoPreview
        v-for="(photo, idx) in photos"
        :key="idx"
        :collection="photo"
        :collectionType="idx % 2 ? 'left' : 'right'"
      />
    </template>
    <p v-else-if="photos && photos.length === 0" class="home__empty-category">
      Don't have any photos yet
    </p>
    <Spiner v-else />
  </div>
</template>
<script>
import PhotoPreview from "../components/PhotoPreview";
import { mapActions, mapState, mapGetters } from "vuex";
import { isCinematographerMode } from "@/helper/constants";
import { setTitle } from "@/helper";

export default {
  components: {
    PhotoPreview
  },
  computed: {
    ...mapState({
      allPhotos: state => state.photos.photos
    }),
    ...mapGetters(["photographerPhotos", "cinematographerPhotos"]),
    // cinematographerPhotosFiltered() {
    //   const photos = this.allPhotos;
    //   if (!photos) {
    //     return false;
    //   }

    //   const res = this.$route.path.includes("commerce")
    //     ? photos.filter(v => v.categories.includes("commerce"))
    //     : this.cinematographerPhotos;

    //   return res.length ? res : this.allPhotos;
    // },
    //
    photos() {
      return isCinematographerMode
        ? this.cinematographerPhotos
        : this.photographerPhotos;
    }
  },
  methods: {
    ...mapActions(["getPhotos"])
  },
  created() {
    if (!this.allPhotos) {
      this.getPhotos();
    }
  },
  mounted() {
    setTitle("Photos");
  }
};
</script>
