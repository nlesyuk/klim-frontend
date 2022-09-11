<template>
  <section class="dashboard">
    <h1 class="dashboard__title">
      Dashboard
      <button class="dashboard-nav__menu-item" role="logout" @click="logoutFn">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill-rule="evenodd"
          clip-rule="evenodd"
        >
          <path
            d="M16 2v7h-2v-5h-12v16h12v-5h2v7h-16v-20h16zm2 9v-4l6 5-6 5v-4h-10v-2h10z"
          />
        </svg>
      </button>
    </h1>
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
import { mapActions } from "vuex";

export default {
  data() {
    return {
      menu: ["slider", "works", "shots", "photos", "contacts"]
    };
  },
  computed: {
    isDasboardRoute() {
      return this.$route.name === "dashboard";
    },
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    ...mapActions("auth", ["logout"]),
    async logoutFn() {
      try {
        await this.logout();
        this.$router.push("/login");
      } catch (error) {
        console.error(error);
      }
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  }
};
</script>
