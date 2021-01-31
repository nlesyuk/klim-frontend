<template>
  <div class="home">
    <div class="home__posts">
      <figure class="home__post" v-for="(idx, item) in 12" :key="idx">
        <img
          src1="//via.placeholder.com/550x450"
          src="@/assets/girl.png"
          :alt="item"
          class="home__img"
        />
      </figure>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {}
};
</script>
