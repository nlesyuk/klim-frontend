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
      player: null,
      isPaused: false,
      isPlaying: false
    };
  },
  watch: {
    currentSlide(id) {
      if (this.source.type !== "video") {
        console.log("WATCH", this.source.type, this.currentSlide);
        return;
      }
      this.launchVideo(id, this.slideId);
    }
  },
  methods: {
    installVimeo() {
      console.log("installVimeo data:", this.source.type, this.currentSlide);
      if (
        !this.source?.video?.vimeoId ||
        this.source.type !== "video" ||
        this.player
      ) {
        console.log("installVimeo - was installed or wrong type");
        return;
      }

      this.player = new Player(this.$refs.video, {
        id: this.source.video.vimeoId,
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
        console.log("quality was successfully set", quality);
      });

      return this.player.ready();
    },
    playVideo() {
      if (!this.player) {
        console.log("playVideo - player is not installed", this.currentSlide);
        this.installVimeo().then(() => {
          console.log("playVideo - then play", this.currentSlide);
          this.player.play();
          this.isPlaying = true;
        });
        return;
      }

      if (this.player) {
        console.log("playVideo - play()", this.currentSlide);
        this.player.setCurrentTime(0).then(time => {
          this.player.play();
          console.log(this.player);
          this.isPlaying = true;
        });
      }
    },
    pauseVideo() {
      if (!this.player) this.installVimeo();

      if (this.isPaused) {
        console.log("pauseVideo - play", this.currentSlide);
        this.player?.play();
        this.isPaused = false;
      } else {
        console.log("pauseVideo - pause", this.currentSlide);
        this.player?.pause().then(() => {
          this.player.setCurrentTime(0);
        });
        this.isPaused = true;
      }
    },
    launchVideo(currentSlideId, slideId) {
      if (currentSlideId < 0) {
        // when prev slide id(idx) as -1 - get id(idx) of last slide
        // currentSlideId = this.allSlides - 1;
      }

      if (!this.player) {
        console.log("launchVideo - install player", this.currentSlide);
        this.installVimeo();
        return;
      }

      if (this.player && currentSlideId === slideId) {
        console.log("launchVideo - play", this.currentSlide);
        this.playVideo();
      } else {
        console.log("launchVideo - pause", this.currentSlide);
        // this.player?.setCurrentTime(0);
        this.pauseVideo();
      }

      /*
      setTimeout(() => {
        if (currentSlideId === slideId && this.player) {
          this.playVideo();
        } else {
          // this.player?.setCurrentTime(0).then(sec => {
          //   this.pauseVideo();
          // });
          this.player?.setCurrentTime(0).then(seconds => {
            // console.log("-set-", seconds);
            this.player?.getCurrentTime().then(seconds => {
              // console.log("-get-", seconds);
            });
          });

          this.pauseVideo();
        }
      }, 0); */
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
