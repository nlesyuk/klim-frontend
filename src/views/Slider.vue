<template>
  <hooper
    :settings="hooperSettings"
    style="height: auto; margin-bottom: 20px;"
    @slide="onSlideChange"
  >
    <slide v-for="(slide, idx) in allSlides" :key="idx" :index="idx">
      <SlideComponent
        :source="slide"
        :slideId="idx"
        :currentSlide="currentSlide"
        :allSlides="allSlides.length"
      />
    </slide>
    <hooper-navigation slot="hooper-addons"></hooper-navigation>
    <hooper-pagination slot="hooper-addons"></hooper-pagination>
  </hooper>
</template>

<script>
import { mapActions, mapState } from "vuex";
import SlideComponent from "../components/Slide";

import {
  Hooper,
  Slide,
  Pagination as HooperPagination,
  Navigation as HooperNavigation
} from "hooper";
import "hooper/dist/hooper.css";

export default {
  components: {
    SlideComponent,
    Hooper,
    Slide,
    HooperPagination,
    HooperNavigation
  },
  data() {
    return {
      currentSlide: 0,
      hooperSettings: {
        autoPlay: true,
        itemsToShow: 1,
        playSpeed: 10 * 1000,
        centerMode: true,
        hoverPause: true,
        wheelControl: false,
        infiniteScroll: true
      }
    };
  },
  computed: {
    ...mapState({
      allSlides: state => state.slides.slides
    })
  },
  methods: {
    ...mapActions(["getSlides"]),
    onSlideChange(object) {
      this.currentSlide = object.currentSlide;
      // console.log("onSlideChange", object);
    }
  },
  mounted() {
    // api
    if (!this.allSlides) {
      this.getSlides().then(data => {
        this.currentSlide = 1;
      });
    }
  }
};
</script>
