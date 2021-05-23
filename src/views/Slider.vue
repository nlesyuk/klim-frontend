<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <PhotoPreview
        v-for="(photo, idx) in photos"
        :key="idx"
        :collection="photo"
        collectionType="left"
        classes="swiper-slide"
        :isHideTitle="true"
      />
    </div>
    <div class="swiper-pagination"></div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
    <div class="swiper-scrollbar"></div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import "swiper/swiper.min.css";
import { Swiper } from "swiper";
import PhotoPreview from "../components/PhotoPreview";

export default {
  components: {
    PhotoPreview
  },
  data() {
    return {
      swiper: null
    };
  },
  computed: {
    photos() {
      let res;
      if (this.$route.path.includes("commerce")) {
        res = this.allPhotos.filter(v => v.category.includes("commerce"));
      } else {
        res = this.allPhotos.filter(v => !v.category.includes("commerce"));
      }
      return res.length ? res : this.allPhotos;
    },
    ...mapState({
      allPhotos: state => state.photos.photos
    })
  },
  methods: {
    ...mapActions(["getAllPhotos"])
  },
  mounted() {
    this.swiper = new Swiper(".swiper-container", {
      speed: 500,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      pagination: true,
      // {
      //   el: ".swiper-pagination",
      //   type: "bullets"
      // },
      slidesPerView: 1,
      spaceBetween: 10
    });

    this.getAllPhotos();
  }
};
</script>
<style lang="scss">
.swiper {
  &-container {
    background: red;
    margin-bottom: 20px;
  }
  &-slide {
    .photo-preview {
      max-height: 830px;
    }
  }
}
</style>
