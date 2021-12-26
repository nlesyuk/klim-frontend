<template>
  <div class="photos">
    <template v-if="photos">
      <PhotoPreview
        v-for="(photo, idx) in photos"
        :key="idx"
        :collection="photo"
        :collectionType="idx % 2 ? 'left' : 'right'"
      />
    </template>
    <p v-else-if="photos !== null" class="home__empty-category">
      Don't have any photos yet
    </p>
    <Spiner v-else />
  </div>
</template>
<script>
import PhotoPreview from "../components/PhotoPreview";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    PhotoPreview
  },
  computed: {
    ...mapState({
      allPhotos: state => state.photos.photos
    }),
    photos() {
      let res;
      if (this.$route.path.includes("commerce")) {
        res = this.allPhotos?.filter(v => v.category.includes("commerce"));
      } else {
        res = this.allPhotos?.filter(v => !v.category.includes("commerce"));
      }
      return res && res.length ? res : this.allPhotos;
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
    this.setTitle("Photos");
  }
};
</script>
