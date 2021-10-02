<template>
  <section class="dashboard-works">
    <button class="dashboard__btn" @click="isShowAddWork = !isShowAddWork">
      Add work
    </button>
    <WorkAdd
      v-if="isShowAddWork"
      :work="work"
      :isEdit="isEdit"
      @resetForm="isEdit = false"
      @workCreateSuccessfully="refresh"
    ></WorkAdd>

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
    <Spiner v-else />
  </section>
</template>

<script>
import WorkAdd from "./WorkAdd.vue";
import WorkPreview from "../../components/WorkPreview";
import { mapState, mapActions } from "vuex";
import { RepositoryFactory } from "Repositories/RepositoryFactory.ts";
const VideosRepository = RepositoryFactory.get("videos");

export default {
  components: {
    WorkAdd,
    WorkPreview
  },
  data() {
    return {
      work: null,
      isEdit: false,
      isShowAddWork: false
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
      this.isShowAddWork = true; // we use the addWork form for edit a work
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
