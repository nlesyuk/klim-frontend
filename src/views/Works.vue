<template>
  <div class="home">
    <div class="works" v-if="works.length">
      <WorkPreview
        v-for="(work, idx) in works"
        :key="idx"
        :work="work"
      ></WorkPreview>
    </div>
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
  async mounted() {
    this.setTitle("Works");
    const { data } = await VideosRepository.getAllVideos();
    this.works = data;
  }
};
</script>
