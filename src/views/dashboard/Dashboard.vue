<template>
  <section class="dashboard">
    <h1 class="dashboard__title">Dashboard</h1>
    <ul class="dashboard__menu">
      <li v-for="item in menu" :key="item">
        <router-link
          tag="button"
          class="dashboard__menu-item"
          :to="{ name: `dasboard-${item}` }"
        >
          {{ item }}
        </router-link>
      </li>
    </ul>
    <router-view></router-view>
    <span class="dashboard__badge badge-red" v-if="isDasboardRoute">
      please choose a category
    </span>
  </section>
</template>

<script>
export default {
  data() {
    return {
      menu: ["slider", "works", "shots", "photos", "contacts"]
    };
  },
  computed: {
    isDasboardRoute() {
      return this.$route.name === "dashboard";
    }
  }
};
</script>
