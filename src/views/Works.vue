<template>
  <div class="home">
    <div class="home__posts" v-if="posts.length">
      <Post
        v-for="(post, idx) in posts"
        :key="idx"
        :src="post.src"
        :id="post.id"
        :title="post.title"
      ></Post>
    </div>
  </div>
</template>

<script>
import Post from "../components/Post";
export default {
  name: "Works",
  components: {
    Post
  },
  data() {
    return {
      posts: []
    };
  },
  mounted() {
    const p = {
      src: "http://via.placeholder.com/550x250",
      title: "Title",
      id: 1
    };
    this.posts.push(p);
    this.posts.push(p);
    this.posts.push(p);
    this.posts.push(p);
    this.posts.push(p);
    this.posts.push(p);
    this.posts.push(p);
    this.posts.push(p);
    this.posts.push(p);
    this.posts.push(p);
  }
};
</script>
