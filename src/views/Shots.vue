<template>
  <div class="shots">
    <ul class="shots__tags">
      <li><button type="button" @click="applyFilter('all')">all</button></li>
      <li>
        <button type="button" @click="applyFilter('portrait')">portrait</button>
      </li>
      <li>
        <button type="button" @click="applyFilter('landscape')">
          landscape
        </button>
      </li>
      <li><button type="button" @click="applyFilter('mood')">mood</button></li>
    </ul>

    <div class="home__posts">
      <figure class="home__post" v-for="(idx, item) in 12" :key="idx">
        <img
          src="//via.placeholder.com/3584x1342"
          :alt="item"
          class="home__img"
        />
      </figure>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    console.log(this.$route.params.category);
  },
  methods: {
    applyFilter(filter) {
      if (this.$route.query.filter !== filter) {
        this.$router.replace({ name: "shots", query: { filter } });
      }
    }
  }
};
</script>
