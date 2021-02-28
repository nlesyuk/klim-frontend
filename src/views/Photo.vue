<template>
  <div class="photos">
    <Spiner v-if="!photos.length" />
    <GridPhotos v-else :images="photos" />
  </div>
</template>
<script>
import GridPhotos from "../components/grids/GridPhotos";

export default {
  name: "Home",
  components: {
    GridPhotos
  },
  data() {
    return {
      allPhotos: []
    };
  },
  computed: {
    photos() {
      if (this.$route.path.includes("commerce")) {
        const res = this.allPhotos.filter(v => v.category.includes("commerce"));
        if (res.length) {
          return res;
        }
      }
      return this.allPhotos;
    }
  },
  mounted() {
    fetch("http://localhost:3000/photos")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.allPhotos = data;
      });
  }
};
</script>
