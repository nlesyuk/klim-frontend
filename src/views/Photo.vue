<template>
  <div class="photos">
    <GridPhotos v-if="photos.length" :images="photos[0].photos" />
    <Spiner v-else />
  </div>
</template>
<script>
import GridPhotos from "../components/grids/GridPhotos";

export default {
  components: {
    GridPhotos
  },
  data() {
    return {
      photos: []
    };
  },
  mounted() {
    console.log(this.$route);
    fetch("http://localhost:3000/photos")
      .then(response => response.json())
      .then(data => {
        /* eslint-disable */
        console.log(data);
        this.photos = data.filter(v => v.id === +this.$route.params.id);
      });
  }
};
</script>
