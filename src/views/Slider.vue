<template>
  <div class="slider swiper-container" ref="slider">
    <div class="swiper-wrapper">
      <SlideComponent
        v-for="(slide, idx) in allSlides"
        :key="idx"
        :source="slide"
        classes="swiper-slide"
      />
    </div>
    <div class="swiper-pagination">{{ $options.test }}</div>
    <div class="swiper-button-prev" ref="prev">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        style="transform: rotateY(180deg);"
      >
        <use xlink:href="#svg-sprite--arrow"></use>
      </svg>
    </div>
    <div class="swiper-button-next" ref="next">
      <svg width="24" height="24" viewBox="0 0 24 24">
        <use xlink:href="#svg-sprite--arrow"></use>
      </svg>
    </div>
    <div class="swiper-scrollbar"></div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import "swiper/swiper.min.css";
import "swiper/components/effect-fade/effect-fade.min.css";
import "swiper/components/pagination/pagination.min.css";
import { Swiper } from "swiper";
import SlideComponent from "../components/Slide";

export default {
  components: {
    SlideComponent
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
    setTimeout(() => {
      this.swiper = new Swiper(this.$refs.slider, {
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

      this.$refs.next.addEventListener("click", () => {
        this.swiper.slideNext();
        console.log("click");
      });
      this.$refs.prev.addEventListener("click", () => {
        this.swiper.slidePrev();
        console.log("click");
      });
    }, 0);
    // api
    if (!this.allSlides) {
      this.getSlides();
    }
  }
};
</script>
