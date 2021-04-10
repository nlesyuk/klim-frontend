<template>
  <div class="work-page">
    <template v-if="work">
      <VimeoVideoPlayer :id="work.videos.vimeo_id" :previewImg="previewImg" />
      <div class="work-page__text">
        <h1>{{ work.title }}</h1>
        <p v-html="work.description"></p>
      </div>
      <GridPhotos :images="work.photos" />
    </template>
    <Spiner v-else />
  </div>
</template>

<script>
import GridPhotos from "../components/grids/GridPhotos";
import VimeoVideoPlayer from "../components/VimeoVideoPlayer";
import { RepositoryFactory } from "./../repositories/RepositoryFactory";
const VideosRepository = RepositoryFactory.get("videos");

export default {
  name: "Work",
  components: {
    GridPhotos,
    VimeoVideoPlayer
  },
  data() {
    return {
      work: null
    };
  },
  computed: {
    previewImg() {
      if (!this.work) return null;
      const res = this.work.photos.filter(img => img.isVideoPreview);
      return res.length ? res[0].src : null;
    }
  },
  async mounted() {
    this.setTitle("Work");
    const { data } = await VideosRepository.getVideo(this.$route.params.id);
    this.work = data;
  }
};
</script>
