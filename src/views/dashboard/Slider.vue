<template>
  <section class="dashboard-slider">
    <button class="dashboard__btn" @click="isShowAddSlide = !isShowAddSlide">
      Add slide
    </button>

    <SliderAdd v-if="isShowAddSlide"></SliderAdd>

    <button type="button" @click="refresh" class="dashboard__btn">
      Refresh slides
    </button>

    <div class="works" v-if="videos && videos.length"></div>
    <div v-else-if="videos && videos.length === 0" class="grid-empty">
      Don't have any items yet
    </div>
    <Spiner v-else />
  </section>
</template>

<script>
import SliderAdd from "./SliderAdd.vue";
import { mapState, mapActions } from "vuex";
import { RepositoryFactory } from "Repositories/RepositoryFactory.ts";
const VideosRepository = RepositoryFactory.get("videos");

export default {
  components: {
    SliderAdd
  },
  data() {
    return {
      work: null,
      isEdit: false,
      isShowAddSlide: false
    };
  },
  computed: {
    ...mapState({
      videos: state => state.videos.videos
    })
  },
  methods: {
    ...mapActions(["getAllVideos"]),
    getPreviewImg(item) {
      const filtered = item.photos.filter(v => v.isVideoPreview);
      return filtered && filtered.length ? filtered[0].src : false;
    },
    remove(id) {
      VideosRepository.delete(id);
    },
    refresh() {
      this.getAllVideos();
    },

    // edit
    edit(id) {
      this.isEdit = true;
      const item = this.videos.filter(v => v.id === id);
      this.work = item?.length ? item[0] : null;
      this.isShowAddSlide = true; // we use the addWork form for edit a work
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
