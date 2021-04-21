<template>
  <div class="home">
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
import { mapActions, mapState } from "vuex";

export default {
  name: "Works",
  components: {
    WorkPreview
  },
  computed: {
    allVideos() {
      if (this.$route.name === "works-commercial") {
        return this.videos.filter(video =>
          video?.category?.includes("commerce")
        );
      }
      return this.videos;
    },
    ...mapState({
      videos: state => state.videos.videos
    })
  },
  methods: {
    ...mapActions(["getAllVideos"])
  },
  mounted() {
    this.setTitle("Works");

    if (!this.videos) {
      this.getAllVideos();
      console.log("getAllVideos");
    }
  }
};
</script>
