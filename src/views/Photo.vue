<template>
  <div class="photos">
    <template v-if="photo">
      <!-- 1 -->
      <!-- <img
        v-if="firstPreview"
        :src="firstPreview.src"
        alt="main preview"
        class="photos__preview image-responsive"
      />
      <h1 class="photos__title">{{ photo.title }}</h1>
      <p class="photos__description" v-html="photo.description"></p>
      <PhotosGrid :images="photos" />
      <p class="photos__credits" v-html="photo.credits"></p> -->
      <!-- 2 -->
      <PhotosGrid :images="firstPhotos" />
      <h1 class="photos__title">{{ photo.title }}</h1>
      <p class="photos__description" v-html="photo.description"></p>
      <PhotosGrid :images="restPhotos" />
      <p class="photos__credits" v-html="photo.credits"></p>
    </template>
    <Spiner v-else />
  </div>
</template>
<script>
import PhotosGrid from "../components/PhotosGrid";
import { RepositoryFactory } from "./../repositories/RepositoryFactory";
const PhotosRepository = RepositoryFactory.get("photos");

export default {
  components: {
    PhotosGrid
  },
  data() {
    return {
      photo: null
    };
  },
  watch: {
    photo(v) {
      console.log("photo w", v);
    }
  },
  computed: {
    // 1
    firstPreview() {
      if (this.photo) {
        const previews = this.photo?.photos.filter(v => v.isPreview);
        if (previews?.length) {
          return previews[0];
        }
      }
      return false;
    },
    photos() {
      const photo = this.photo;
      if (photo) {
        return photo?.photos;
        // return photo?.photos?.filter(v => v.id != this.firstPreview?.id);
      }
      return [];
    },
    // 2
    firstPhotos() {
      if (this.photo) {
        const previews = this.photo?.photos.filter(v => v.isPreview);
        if (previews?.length) {
          return previews;
        }
      }
      return [];
    },
    restPhotos() {
      if (this.photo) {
        const previews = this.photo?.photos.filter(v => !v.isPreview);
        if (previews?.length) {
          return previews;
        }
      }
      return [];
    }
  },
  methods: {},
  async mounted() {
    this.setTitle("Photo");
    try {
      const { data } = await PhotosRepository.getById(+this.$route.params.id);
      console.log("data", data);
      this.photo = data;
      // this.setTitle(data[0].title);
    } catch (e) {
      console.error(e);
    }
  }
};
</script>
