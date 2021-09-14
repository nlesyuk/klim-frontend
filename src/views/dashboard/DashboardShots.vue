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

    <EditShot
      v-if="isEdit"
      :shot="editedShot"
      :videos="videos"
      @close="closeEdit"
    />

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
import EditShot from "./DashboardEditShot.vue";
import GridPhotosShots from "../../components/GridPhotosShots";
import { mapState, mapActions } from "vuex";
import { RepositoryFactory } from "Repositories/RepositoryFactory.ts";
const ShotRepository = RepositoryFactory.get("shots");

export default {
  components: {
    GridPhotosShots,
    AddShot,
    EditShot
  },
  data() {
    return {
      isLoading: false,
      isEdit: false,
      editedShot: null,
      isShowAddShot: false,
      filteredPhotos: []
    };
  },
  computed: {
    ...mapState({
      videos: state => state.videos.videos,
      allPhotos: state => state.shots.shots
    })
  },
  methods: {
    ...mapActions(["getAllShots", "getAllVideos"]),
    refresh() {
      this.getAllShots();
    },
    async remove(id) {
      try {
        this.isLoading = true;
        this.filteredPhotos = this.filteredPhotos.filter(v => v.id != id);
        const res = await ShotRepository.delete(id);
        console.log("REMOVE", res);
      } catch (e) {
        console.error("REMOVE ERROR", e);
      } finally {
        this.isLoading = false;
      }
    },
    edit(id) {
      this.isEdit = true;
      const finded = this.filteredPhotos.filter(v => v.id === id);
      this.editedShot = finded?.length ? finded[0] : null;
    },

    closeEdit() {
      this.isEdit = false;
    }
  },
  mounted() {
    if (!this.allPhotos.length) {
      this.getAllShots().then(data => {
        this.filteredPhotos = data;
      });
    }
    this.filteredPhotos = this.allPhotos;

    if (!this.videos) {
      this.getAllVideos();
    }
  }
};
</script>
