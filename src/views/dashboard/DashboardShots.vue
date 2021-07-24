<template>
  <section class="dashboard-shots">
    <button
      type="button"
      class="dashboard__btn"
      @click="isShowAddShot = !isShowAddShot"
    >
      Add shot
    </button>
    <AddShot v-if="isShowAddShot" />
    <button type="button" @click="refresh" class="dashboard__btn">
      Refresh shots
    </button>

    <GridPhotosShots
      v-if="filteredPhotos.length"
      :images="filteredPhotos"
      :isManage="true"
      @removeImg="remove"
      @editImg="edit"
    ></GridPhotosShots>
    <Spiner v-else />
  </section>
</template>

<script>
import AddShot from "./DashboardAddShot.vue";
import GridPhotosShots from "../../components/GridPhotosShots";
import { mapState, mapActions } from "vuex";
import { RepositoryFactory } from "Repositories/RepositoryFactory.ts";
const VideosRepository = RepositoryFactory.get("videos");

export default {
  components: {
    GridPhotosShots,
    AddShot
  },
  data() {
    return {
      isShowAddShot: false,
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
    refresh() {
      this.getAllShots();
    },
    remove(id) {
      this.filteredPhotos = this.filteredPhotos.filter(v => v.id != id);
      console.log("removeImg", id);

      VideosRepository.delete(id);
    },
    edit(id) {
      console.log("editImg", id);
      //
      // VideosRepository.update(payload, id);
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
