<template>
  <div class="work-page">
    <template v-if="work">
      <VimeoVideoPlayer :id="work.videos.vimeoId" :previewImg="previewImg" />
      <div class="work-page__text">
        <h1>{{ work.title }}</h1>
        <p v-html="work.description"></p>
      </div>
      <GridPhotos
        v-show="work.photos"
        :images="work.photos"
        :isWorks="isPreview"
      />
      <p class="work-page__credits" v-html="work.credits"></p>
    </template>
    <Spiner v-else />
  </div>
</template>

<script>
import GridPhotos from "../components/GridPhotos";
import VimeoVideoPlayer from "../components/VimeoVideoPlayer";
import { RepositoryFactory } from "./../repositories/RepositoryFactory";
const VideosRepository = RepositoryFactory.get("videos");

export default {
  name: "Work",
  props: {
    previewWork: {
      type: Object
    },
    isPreview: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    previewWork(v) {
      this.work = v;
    }
  },
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
      if (!this.work) {
        return null;
      }
      if (this.isPreview) {
        const res = this.work?.photos
          ? this.work.photos.filter(img => img.isPreview)
          : [];
        return res.length ? res[0].src : "";
      }
      const res = this.work.photos.filter(img => img.isPreview);
      return res.length ? res[0].src : null;
    }
  },
  async mounted() {
    this.setTitle("Work");

    if (this.isPreview) {
      this.work = this.previewWork;
      return;
    }

    try {
      const { data } = await VideosRepository.getVideo(this.$route.params.id);
      this.work = data;
    } catch (e) {
      // eslint-disable-next-line
      console.error(e);
    }
  }
};
</script>
