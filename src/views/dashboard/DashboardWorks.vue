<template>
  <section class="dashboard-works">
    <AddWork :work="work"></AddWork>
    <span class="dashboard__badge badge-green">all works</span>

    <button type="button" @click="refresh" class="dashboard__btn">
      Refresh works
    </button>
    <button
      type="button"
      @click="isHideWorks = !isHideWorks"
      class="dashboard__btn"
    >
      {{ isHideWorks ? "Hide" : "Show" }} works
    </button>

    <div class="works" v-if="videos && videos.length && isHideWorks">
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

export default {
  components: {
    AddWork,
    WorkPreview
  },
  data() {
    return {
      work: null,
      isHideWorks: false
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
    },
    edit(id) {
      console.log(id);
      const item = this.videos.filter(v => v.id === id);
      console.log(item);
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
