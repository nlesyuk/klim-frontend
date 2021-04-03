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
    <GridPhotos v-if="filteredPhotos.length" :images="filteredPhotos" />
    <Spiner v-else />
  </div>
</template>
<script>
import GridPhotos from "../components/grids/GridPhotos";
import { RepositoryFactory } from "./../repositories/RepositoryFactory";
const ShotsRepository = RepositoryFactory.get("shots");

export default {
  components: {
    GridPhotos
  },
  computed: {
    filter() {
      return this.$route.query.filter;
    }
  },
  watch: {
    $route(route) {
      const filter = route.query.filter;
      this.applyFilter(filter);
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
      this.filteredPhotos =
        key === "all"
          ? this.allPhotos
          : this.allPhotos.filter(item => item.category.includes(key));
    }
  },
  data() {
    return {
      allPhotos: [],
      filteredPhotos: []
    };
  },
  async mounted() {
    this.setTitle("Shots");
    const { data } = await ShotsRepository.get();
    this.allPhotos = data;
    this.filteredPhotos = data;
  }
};
</script>
