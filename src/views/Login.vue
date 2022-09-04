<template>
  <section class="login">
    <form action="#" class="login__form" @submit.prevent="handleLogin">
      <img
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="login__profile-img"
      />
      <label class="login__label">
        <!-- <span>Username</span> -->
        <input
          type="text"
          name="email"
          v-model="username"
          placeholder="username"
        />
      </label>
      <label class="login__label">
        <!-- <span>Password</span> -->
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
      <p v-if="serverError" class="login__error">{{ serverError }}</p>
    </form>
  </section>
</template>

<script>
// is in progress
import RepositoryFactory from "@/repositories/RepositoryFactory";
const AuthRepository = RepositoryFactory.get("auth");
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      username: "test",
      password: "123",
      serverError: null
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/dashboard");
    }
  },
  methods: {
    ...mapActions("auth", ["login"]),
    async handleLogin() {
      try {
        const { username, password } = this;
        const payload = {
          username: this.username,
          password: this.password
        };
        console.log(username, password);

        // const response = await AuthRepository.login(payload);
        // console.log(response);

        this.loading = true;

        if (username && password) {
          await this.login(payload);
          this.loading = false;
          this.$router.push("/dashboard");
        }
      } catch (error) {
        this.loading = false;
        this.message =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        console.log(">>>", this.message);
        // console.error(error);
        this.handlerServerError(error);
      }
    },
    handlerServerError(error) {
      // console.log(error);
      this.serverError = error.response.data.message;
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
    width: 400px;
    max-width: 100%;
    background-color: rgba(0, 0, 0, 0.03);
    margin: 0 auto;
    padding: 3.5rem;
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
      border-radius: 3px;
    }
  }
  &__btn {
    display: block;
    box-sizing: border-box;
    width: 100%;
    padding: 1.5rem;
    border: none;
    background-color: #999;
    font-weight: 500;
    border-radius: 3px;
    text-align: center;
    color: white;
    cursor: pointer;
    transition: all 0.25s;
    &:hover {
      transition: all 0.25s;
      opacity: 0.75ss;
      background-color: #555;
    }
  }
}
</style>
