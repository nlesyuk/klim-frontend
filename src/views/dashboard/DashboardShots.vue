<template>
  <section class="dashboard-shots">
    <AddShot />
    <button type="button" @click="refresh" class="dashboard__btn">
      Refresh works
    </button>

    <transition name="fade" mode="out-in">
      <GridPhotos v-if="filteredPhotos.length" :images="filteredPhotos" />
      <Spiner v-else />
    </transition>
  </section>
</template>

<script>
import AddShot from "./DashboardAddShot.vue";
import GridPhotos from "../../components/GridPhotos.vue";
import { mapState, mapActions } from "vuex";
import { RepositoryFactory } from "Repositories/RepositoryFactory.ts";
const VideosRepository = RepositoryFactory.get("videos");

export default {
  components: {
    GridPhotos,
    AddShot
  },
  data() {
    return {
      filteredPhotos: []
    };
  },
  computed: {
    ...mapState({
      allPhotos: state => state.shots.shots
    })
  },
  methods: {
    ...mapActions(["getAllShots"]),
    edit(id) {
      // this.isEdit = true;
      // const item = this.videos.filter(v => v.id === id);
      // this.work = item[0];
    },
    refresh() {
      this.getAllShots();
    }
  },
  mounted() {
    if (!this.allPhotos.length) {
      this.getAllShots().then(data => {
        this.filteredPhotos = data;
      });
    }
    this.filteredPhotos = this.allPhotos;
  }
};
</script>

<style></style>
