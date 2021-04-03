<template>
  <div class="work-page">
    <Spiner v-if="!work" />
    <template v-else>
      <div class="work-page__video">
        <div class="video-responsive ">
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/Fq8DBUjJt2o"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
      <div class="work-page__text">
        <h1>
          i-D 16x16
        </h1>
        <ul>
          <li>director Tom Ivin</li>
          <li>producer Declan Higgins</li>
          <li>graded at Cheat (Joseph Bicknell)</li>
        </ul>
      </div>
      <GridPhotos :images="work.photos" />
    </template>
  </div>
</template>

<script>
import GridPhotos from "../components/grids/GridPhotos";
import { RepositoryFactory } from "./../repositories/RepositoryFactory";
const VideosRepository = RepositoryFactory.get("videos");

export default {
  name: "Work",
  components: {
    GridPhotos
  },
  data() {
    return {
      work: null
    };
  },
  async mounted() {
    this.setTitle("Work");
    const { data } = await VideosRepository.getVideo(this.$route.params.id);
    this.work = data;
  }
};
</script>
