<template>
  <figure :class="[classes, 'slider__slide test']" @click="goTo">
    <!-- img -->
    <img
      v-if="source.type === 'image'"
      :src="source.image"
      class="slider__img"
      loading="lazy"
    />
    <!-- video -->
    <template v-else-if="source.type === 'video'">
      <div
        ref="video"
        :class="['vimeoPlayer', { hidden: !isPlaying }]"
        @click="pauseVideo"
      ></div>
    </template>
    <!-- button -->
    <!-- <button type="button" class="slider__btn-more">{{ source.text }}</button> -->
  </figure>
</template>

<script>
import Player from "@vimeo/player";

export default {
  props: {
    source: {
      type: Object,
      required: true
    },
    classes: {
      type: String
    },
    isHideTitle: {
      type: Boolean,
      default: false
    },
    currentSlide: {
      type: [Number, String],
      required: true
    },
    slideId: {
      type: [Number, String],
      required: true
    },
    allSlides: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      isPaused: false,
      player: null,
      isPlaying: false
    };
  },
  watch: {
    currentSlide(id) {
      this.launchVideo(id, this.slideId);
    }
  },
  computed: {
    vimeoBackground() {
      return this.isPlaying ? "" : `background-image: url(${this.previewImg});`;
    }
  },
  methods: {
    installVimeo() {
      if (this.source.type !== "video") return;
      if (this.player) return;

      this.player = new Player(this.$refs.video, {
        id: this.source.video.vimeo_id,
        width: 640,
        color: "#ff0000",
        background: true,
        autopause: true,
        byline: false,
        loop: true,
        controls: false,
        responsive: true
      });
      // this.player.setQuality("720p").then(function(quality) {
      //   console.log("quality was successfully set");
      // });
    },
    playVideo() {
      if (!this.player) this.installVimeo();

      if (this.player) {
        this.player.play();
        this.isPlaying = true;
      }
    },
    pauseVideo() {
      if (!this.player) this.installVimeo();

      if (this.isPaused) {
        this.player?.play();
        this.isPaused = false;
      } else {
        this.player?.pause();
        this.isPaused = true;
      }
    },
    launchVideo(currentSlideId, slideId) {
      if (currentSlideId < 0) {
        // when prev slide id(idx) as -1 - get id(idx) of last slide
        currentSlideId = this.allSlides - 1;
      }
      if (!this.player) {
        this.installVimeo();
      }
      setTimeout(() => {
        if (currentSlideId === slideId && this.player) {
          this.playVideo();
        } else {
          this.player?.setCurrentTime(0).then(seconds => {
            // console.log("-set-", seconds);
            this.player?.getCurrentTime().then(seconds => {
              // console.log("-get-", seconds);
            });
          });

          this.pauseVideo();
        }
      }, 100);
    },

    //
    goTo() {
      if (this.source?.hasOwnProperty("photo_id")) {
        this.$router.push({
          name: "photo",
          params: { id: this.source.photo_id }
        });
      }
      if (this.source?.hasOwnProperty("work_id")) {
        this.$router.push({
          name: "work",
          params: { id: this.source.work_id }
        });
      }
    }
  }
};
</script>
