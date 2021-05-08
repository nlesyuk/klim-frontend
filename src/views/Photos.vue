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
import { mapActions, mapState } from "vuex";

export default {
  components: {
    PhotoPreview
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
    },
    ...mapState({
      allPhotos: state => state.photos.photos
    })
  },
  methods: {
    ...mapActions(["getAllPhotos"])
  },
  created() {
    if (!this.allPhotos.length) {
      this.getAllPhotos();
    }
  },
  mounted() {
    this.setTitle("Photos");
  }
};
</script>
