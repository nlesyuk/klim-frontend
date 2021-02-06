<template>
  <div class="home">
    <div class="video-responsive">
      <iframe
        width="100%"
        height="315"
        src="https://www.youtube.com/embed/Fq8DBUjJt2o"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
    <div class="photos__row">
      <figure class="photos__item photos__item--1">
        <img
          src="http://via.placeholder.com/550x250"
          alt="Gallery image 3"
          class="photos__img"
        />
      </figure>
      <figure class="photos__item photos__item--2">
        <img
          src="http://via.placeholder.com/550x250"
          alt="Gallery image 3"
          class="photos__img"
        />
      </figure>
      <figure class="photos__item photos__item--3">
        <img
          src="http://via.placeholder.com/550x250"
          alt="Gallery image 3"
          class="photos__img"
        />
      </figure>
    </div>
  </div>
</template>

<script>
export default {
  name: "Work",
  components: {},
  data() {
    return {
      posts: []
    };
  },
  mounted() {
    const p = {
      id: "1",
      type: "video",
      video: "http://via.placeholder.com/550x250",
      title: "Title",
      link: "/works/1",
      photos: [
        {
          src: "http://via.placeholder.com/550x250"
        }
      ]
    };
    this.posts.push(p);
  }
};
</script>
