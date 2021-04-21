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
import GridPhotos from "../components/GridPhotos";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    GridPhotos
  },
  data() {
    return {
      filteredPhotos: []
    };
  },
  computed: {
    filter() {
      return this.$route.query.filter;
    },
    ...mapState({
      allPhotos: state => state.shots.shots
    })
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
    },
    ...mapActions(["getAllShots"])
  },
  mounted() {
    this.setTitle("Shots");

    if (!this.allPhotos.length) {
      this.getAllShots().then(data => {
        this.filteredPhotos = data;
      });
    }
    this.filteredPhotos = this.allPhotos;
  }
};
</script>
