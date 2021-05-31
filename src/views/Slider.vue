<template>
  <div class="slider swiper-container">
    <div class="swiper-wrapper">
      <Slide
        v-for="(slide, idx) in allSlides"
        :key="idx"
        :source="slide"
        classes="swiper-slide"
      />
    </div>
    <div class="swiper-pagination"></div>
    <div class="swiper-button-prev" ref="prev">prev</div>
    <div class="swiper-button-next" ref="next">next</div>
    <div class="swiper-scrollbar"></div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import "swiper/swiper.min.css";
import "swiper/components/effect-fade/effect-fade.min.css";
import "swiper/components/pagination/pagination.min.css";
import { Swiper } from "swiper";
import Slide from "../components/Slide";

export default {
  components: {
    Slide
  },
  data() {
    return {
      swiper: null
    };
  },
  computed: {
    ...mapState({
      allSlides: state => state.slides.slides
    })
  },
  methods: {
    ...mapActions(["getSlides"])
  },
  mounted() {
    this.swiper = new Swiper(".swiper-container", {
      speed: 500,
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      pagination: {
        el: ".swiper-pagination",
        type: "bullets"
      },
      slidesPerView: 1,
      spaceBetween: 0,
      effect: "fade",
      fadeEffect: {
        crossFade: true
      },
      on: {
        init: function() {
          console.log("swiper initialized");
        },
        slideChange: function() {
          console.log("swiper slideChange");
        }
      }
    });
    // this.swiper.on("slideChange", function() {
    //   console.log("slide changed");
    // });
    this.$refs.next.addEventListener("click", () => {
      this.swiper.slideNext();
      console.log("click");
    });
    this.$refs.prev.addEventListener("click", () => {
      this.swiper.slidePrev();
      console.log("click");
    });

    // api
    if (!this.allSlides) {
      this.getSlides();
    }
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
