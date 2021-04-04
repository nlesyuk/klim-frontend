<template>
  <!--<div class="video-responsive ">
     <iframe
      ref="video"
      width="100%"
      height="315"
      src="https://www.youtube.com/embed/Fq8DBUjJt2o"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>-->
  <div class="vimeoPlayer video-responsive" ref="video"></div>
</template>
<script>
import Player from "@vimeo/player";
console.log("Player", Player);

export default {
  data() {
    return {
      player: null
    };
  },
  methods: {
    install() {
      this.player = new Player(this.$refs.video, {
        id: 19231868,
        width: 640
      }).on("ended", function() {
        console.log("video ended!");
      });
    }
  },
  mounted() {
    // fetch("https://api.vimeo.com/").then(res => {
    //   console.log(res);
    // });

    this.install();
  }
};
</script>

<style></style>
