<template>
  <div class="shots">
    <div class="shots__tags">
      <button
        type="button"
        v-for="(name, idx) in categories"
        :key="idx"
        @click="changeFilter(name)"
        :class="['btn', 'btn-primary', { active: filter === name }]"
      >
        {{ name }}
      </button>
    </div>

    <transition name="fade" mode="out-in">
      <template v-if="toggle">
        <GridPhotosShots v-if="filteredShots.length" :images="filteredShots" />
        <p v-else-if="filteredShots.length === 0" class="home__empty-category">
          Don't have any shots yet
        </p>
        <Spiner v-else />
      </template>
    </transition>
  </div>
</template>
<script>
import GridPhotosShots from "../components/GridPhotosShots";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    GridPhotosShots
  },
  data() {
    return {
      toggle: true, // for relaunch gridPhotos component when change filter
      filteredShots: []
    };
  },
  computed: {
    filter() {
      return this.$route.query.filter;
    },
    ...mapState({
      allShots: state => state.shots.shots,
      categories: state => state.shots.categories
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
      this.toggle = false;
      if (this.$route.query.filter !== filter) {
        this.$router.replace({ name: "shots", query: { filter } });
        this.applyFilter(filter);
        setTimeout(() => {
          this.toggle = true;
        }, 300);
      }
    },
    applyFilter(key) {
      this.filteredShots =
        key === "all"
          ? this.allShots
          : this.allShots.filter(item => item.categories.includes(key));
    },
    ...mapActions(["getAllShots"])
  },
  mounted() {
    this.setTitle("Shots");

    if (!this.allShots.length) {
      this.getAllShots().then(data => {
        this.filteredShots = data;

        // apply filter if exist in route
        const filter = this.$route?.query?.filter;
        if (filter) {
          this.applyFilter(filter);
        }
      });
    }
    this.filteredShots = this.allShots;
  }
};
</script>
