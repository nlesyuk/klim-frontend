<template>
  <div class="home">
    <Slider />
    <div class="works" v-if="allVideos && allVideos.length">
      <WorkPreview
        v-for="(video, idx) in allVideos"
        :key="idx"
        :work="video"
      ></WorkPreview>
    </div>
    <Spiner v-else />
  </div>
</template>

<script>
import WorkPreview from "../components/WorkPreview";
import Slider from "./Slider";
import { mapActions, mapState } from "vuex";

export default {
  name: "Works",
  components: {
    WorkPreview,
    Slider
  },
  computed: {
    ...mapState({
      videos: state => state.videos.videos
    }),
    isMobile() {
      return window.innerWidth < 992;
    },
    allVideos() {
      if (this.$route.name === "works-commercial") {
        if (!this.videos) {
          return;
        }
        return this.videos.filter(video =>
          video?.category?.includes("commerce")
        );
      }
      return this.videos;
    }
  },
  methods: {
    ...mapActions(["getAllVideos"])
  },
  mounted() {
    this.setTitle("Works");

    if (!this.videos) {
      this.getAllVideos();
    }
  }
};
</script>
