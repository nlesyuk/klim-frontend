<template>
  <div class="shots">
    <div class="shots__tags">
      <button
        type="button"
        @click="changeFilter('all')"
        :class="['btn', 'btn-primary', { active: filter === 'all' }]"
      >
        all
      </button>
      <button
        type="button"
        @click="changeFilter('portrait')"
        :class="['btn', 'btn-primary', { active: filter === 'portrait' }]"
      >
        portrait
      </button>
      <button
        type="button"
        @click="changeFilter('landscape')"
        :class="['btn', 'btn-primary', { active: filter === 'landscape' }]"
      >
        landscape
      </button>
      <button
        type="button"
        @click="changeFilter('mood')"
        :class="['btn', 'btn-primary', { active: filter === 'mood' }]"
      >
        mood
      </button>
    </div>
    <Spiner v-if="!photos.length" />
    <GridPhotos v-else :images="photos" />
  </div>
</template>
<script>
import GridPhotos from "../components/grids/GridPhotos";

export default {
  components: {
    GridPhotos
  },
  computed: {
    filter() {
      return this.$route.query.filter;
    }
  },
  methods: {
    changeFilter(filter) {
      if (this.$route.query.filter !== filter) {
        this.$router.replace({ name: "shots", query: { filter } });
        this.applyFilter(filter);
      }
    },
    applyFilter(key) {
      this.photos =
        key === "all"
          ? this.allPhotos
          : this.allPhotos.filter(item => item.category.includes(key));
    }
  },
  data() {
    return {
      allPhotos: [],
      photos: []
    };
  },
  mounted() {
    fetch("http://localhost:3000/shots")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.allPhotos = data;
        this.photos = data;
      });
  }
};
</script>
