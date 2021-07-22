<template>
  <section class="dashboard-shots">
    <button type="button" @click="refresh" class="dashboard__btn">
      Refresh works
    </button>

    <transition name="fade" mode="out-in">
      <template v-if="toggle">
        <GridPhotos v-if="filteredPhotos.length" :images="filteredPhotos" />
        <Spiner v-else />
      </template>
    </transition>
  </section>
</template>

<script>
import GridPhotos from "../../components/GridPhotos";
import { mapState, mapActions } from "vuex";
import { RepositoryFactory } from "Repositories/RepositoryFactory.ts";
const VideosRepository = RepositoryFactory.get("videos");

export default {
  components: {
    GridPhotos
  },
  data() {
    return {
      work: null,
      isHideWorks: false,
      isEdit: false
    };
  },
  computed: {
    ...mapState({
      allPhotos: state => state.shots.shots
    })
  },
  methods: {
    ...mapActions(["getAllVideos"]),
    getPreviewImg(item) {
      const filtered = item.photos.filter(v => v.isVideoPreview);
      return filtered && filtered.length ? filtered[0].src : false;
    },
    remove(id) {
      console.log(id);
      // remove video
      // VideosRepository.delete(id)
    },
    edit(id) {
      this.isEdit = true;
      const item = this.videos.filter(v => v.id === id);
      this.work = item[0];
    },
    refresh() {
      this.getAllVideos();
    }
  },
  created() {
    if (!this.videos) {
      this.getAllVideos();
    }
  }
};
</script>

<style></style>
