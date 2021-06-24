<template>
  <figure :class="[classes, 'slider__slide']" @click="goTo">
    <!-- img -->
    <img
      v-if="source.type === 'image'"
      :src="source.image"
      class="slider__img"
      loading="lazy"
    />
    <!-- video -->
    <div
      v-else-if="source.type === 'video'"
      ref="video"
      :class="['vimeoPlayer', { hidden: !isPlaying }]"
      @click="pauseVideo"
    ></div>
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
  methods: {
    installVimeo() {
      if (this.source.type !== "video") return;
      if (this.player) return;

      console.log("install video");

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
      this.player.setQuality("720p").then(function(quality) {
        console.log("quality was successfully set");
      });
      return this.player.ready();
    },
    playVideo() {
      if (!this.player) {
        this.installVimeo().then(() => {
          this.player.play();
          this.isPlaying = true;
        });
        return;
      }

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
          this.player?.setCurrentTime(0);
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
  },
  mounted() {
    if (this.source.type === "video") {
      this.playVideo();
    }
  }
};
</script>
