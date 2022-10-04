<template>
  <section class="login">
    <form action="#" class="login__form" @submit.prevent="getLogin">
      <img
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="login__profile-img"
      />
      <label class="login__label">
        <input
          type="text"
          name="email"
          v-model="username"
          placeholder="username"
        />
      </label>
      <label class="login__label">
        <input
          type="password"
          name="password"
          v-model="password"
          placeholder="Password"
        />
      </label>
      <button type="submit" class="login__btn">
        Login
      </button>
      <p v-if="loading">Loading...</p>
      <p v-if="error" class="login__error">{{ error }}</p>
    </form>
  </section>
</template>

<script>
import { mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {
      username: "",
      password: "",
      // username: "test",
      // password: "1234",
      error: null,
      loading: false
    };
  },
  computed: {
    userRefreshToken() {
      return this.$store.state.auth.user?.refreshToken;
    },
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  async created() {
    // get data from LS and then send RefreshToken to server
    // if RefreshToken still fresh - update store and redirect to /dashboard
    // if not stay on login page
    if (!this.loggedIn && this.userRefreshToken) {
      try {
        await this.getAccessToken();
        await this.setToLoggedIn(true);
        this.$router.push("/dashboard");
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        this.$error(error);
      }
    } else if (this.loggedIn) {
      this.$router.push("/dashboard");
    }
  },
  methods: {
    ...mapActions("auth", ["login", "refreshToken"]),
    ...mapMutations("auth", ["setLoggedIn"]),

    async getLogin() {
      try {
        const user = {
          username: this.username,
          password: this.password
        };
        this.loading = true;

        await this.login(user);
        this.$router.push("/dashboard");

        this.error = "";
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },

    async getAccessToken() {
      await this.refreshToken(this.userRefreshToken);
    },

    async setToLoggedIn(isLoggedIn = false) {
      this.setLoggedIn(isLoggedIn);
    }
  }
};
</script>

<style lang="scss">
.login {
  min-height: 50vh;
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;

  &__profile-img {
    display: block;
    max-width: 80px;
    margin: 0 auto;
    border-radius: 50%;
    margin-bottom: 32px;
  }
  &__form {
    width: 320px;
    max-width: 100%;
    background-color: rgba(0, 0, 0, 0.03);
    margin: 0 auto;
    border-radius: 8px;
    padding: 3.5rem;
    box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset,
      rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
  }
  &__label {
    display: block;
    margin-bottom: 16px;
    span {
      display: block;
      padding: 0.5rem;
    }
    input {
      display: block;
      width: 100%;
      box-sizing: border-box;
      padding: 1.25rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      color: rgb(137, 137, 137);
    }
  }
  &__btn {
    display: block;
    box-sizing: border-box;
    width: 100%;
    padding: 1.5rem;
    border: none;
    background-color: rgb(205, 205, 205);
    border: 1px solid rgb(199, 199, 199);
    color: white;
    color: rgb(110, 110, 110);
    font-weight: 500;
    border-radius: 4px;
    text-align: center;
    cursor: pointer;
    transition: all 0.25s;
    &:hover {
      transition: all 0.25s;
      opacity: 0.75ss;
      background-color: rgb(136, 136, 136);
      color: black;
    }
  }
  &__error {
    display: block;
    width: 100%;
    font-size: 1.25rem;
    padding: 8px 0;
    text-align: center;
    background-color: #f6e5e6;
    color: #6d4044;
    margin-top: 8px;
    border: 1px solid #eddedf;
    border-radius: 4px;
    cursor: default;
  }
}
</style>
