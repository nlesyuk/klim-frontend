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
      photos: []
    };
  },
  mounted() {
    fetch("http://localhost:3000/photos")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.photos = data;
      });
  }
};
</script>
