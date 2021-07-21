<template>
  <section class="dashboard-works">
    <AddWork
      :work="work"
      :isEdit="isEdit"
      @resetForm="isEdit = false"
    ></AddWork>

    <button type="button" @click="refresh" class="dashboard__btn">
      Refresh works
    </button>

    <div class="works" v-if="videos && videos.length">
      <WorkPreview v-for="(video, idx) in videos" :key="idx" :work="video">
        <ul class="dashboard__list" slot="default">
          <li>
            <button type="button" @click.prevent="remove(video.id)">
              Remove
            </button>
          </li>
          <li>
            <button type="button" @click.prevent="edit(video.id)">Edit</button>
          </li>
        </ul>
      </WorkPreview>
    </div>
  </section>
</template>

<script>
import AddWork from "./DashboardAddWork.vue";
import WorkPreview from "../../components/WorkPreview";
import { mapState, mapActions } from "vuex";
import { RepositoryFactory } from "Repositories/RepositoryFactory.ts";
const VideosRepository = RepositoryFactory.get("videos");

export default {
  components: {
    AddWork,
    WorkPreview
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
