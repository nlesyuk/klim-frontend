<template>
  <div class="photos">
    <Spiner v-if="!photos.length" />
    <GridPhotos v-else :images="photos" />
  </div>
</template>
<script>
import GridPhotos from "./grids/GridPhotos";

export default {
  components: {
    GridPhotos
  },
  props: {
    collection: {
      type: Array,
      required: true
    }
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
        console.log(data);
        this.allPhotos = data;
      });
  }
};
</script>
