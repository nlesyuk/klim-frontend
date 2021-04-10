<template>
  <div class="home">
    <div class="works" v-if="allWorks.length">
      <WorkPreview
        v-for="(work, idx) in allWorks"
        :key="idx"
        :work="work"
      ></WorkPreview>
    </div>
    <Spiner v-else />
  </div>
</template>

<script>
import WorkPreview from "../components/WorkPreview";
import { RepositoryFactory } from "./../repositories/RepositoryFactory";
const VideosRepository = RepositoryFactory.get("videos");

export default {
  name: "Works",
  components: {
    WorkPreview
  },
  data() {
    return {
      works: []
    };
  },
  computed: {
    allWorks() {
      if (this.$route.name === "works-commercial") {
        return this.works.filter(work => work?.category?.includes("commerce"));
      }
      return this.works;
    }
  },
  async mounted() {
    this.setTitle("Works");
    const { data } = await VideosRepository.getAllVideos();
    this.works = data;
  }
};
</script>
