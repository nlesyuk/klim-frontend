<template>
  <div class="photos">
    <Spiner v-if="!photos.length" />
    <PhotoPreview
      v-else
      v-for="(idx, photo) in photos"
      :key="idx"
      :collection="photo"
    />
  </div>
</template>
<script>
import PhotoPreview from "../components/PhotoPreview";

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
  mounted() {
    fetch("http://localhost:3000/photos")
      .then(response => response.json())
      .then(data => {
        /* eslint-disable */
        console.log(data);
        this.allPhotos = data;
      });
  }
};
</script>
