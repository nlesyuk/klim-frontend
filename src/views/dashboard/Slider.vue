<template>
  <section class="dashboard-slider">
    <button class="dashboard__btn" @click="isShowAddSlide = !isShowAddSlide">
      Add slide
    </button>

    <SliderAdd
      v-if="isShowAddSlide"
      :slides="slides"
      :works="videos"
      :photos="photos"
    ></SliderAdd>

    <button type="button" @click="refresh" class="dashboard__btn">
      Refresh slides
    </button>

    <Slides
      v-if="slides && slides.length"
      :slides="slides"
      @delete="onDelete"
      @edit="onEdit"
    ></Slides>
    <div v-else-if="slides && slides.length === 0" class="grid-empty">
      Don't have any items yet
    </div>
    <Spiner v-else />
  </section>
</template>

<script>
import SliderAdd from "./SliderAdd.vue";
import Slides from "../../components/Slides.vue";
import { mapState, mapActions } from "vuex";
import { RepositoryFactory } from "Repositories/RepositoryFactory.ts";
const SlidesRepository = RepositoryFactory.get("slides");

export default {
  components: {
    Slides,
    SliderAdd
  },
  data() {
    return {
      work: null,
      isEdit: false,
      isShowAddSlide: false
    };
  },
  computed: {
    ...mapState({
      slides: state => state.slides.slides,
      videos: state => state.videos.videos,
      photos: state => state.photos.photos
    })
  },
  methods: {
    ...mapActions(["getSlides", "getAllVideos", "getPhotos"]),
    getPreviewImg(item) {
      const filtered = item.photos.filter(v => v.isVideoPreview);
      return filtered && filtered.length ? filtered[0].src : false;
    },
    onDelete(id) {
      SlidesRepository.delete(id)
        .then(() => {
          this.getSlides(); // not good, TODO: remove item from store with mutation
        })
        .catch(err => {
          console.error(err);
        });
    },
    refresh() {
      this.getAllVideos();
    },

    // edit
    onEdit(id) {
      this.isEdit = true;
      const item = this.videos.filter(v => v.id === id);
      this.work = item?.length ? item[0] : null;
      this.isShowAddSlide = true; // we use the addWork form for edit a work
    }
  },
  created() {
    if (!this.slides) {
      this.getSlides();
    }
    if (!this.videos) {
      this.getAllVideos();
    }
    if (!this.photos) {
      this.getPhotos();
    }
  }
};
</script>
