<template>
  <section class="login">
    <form action="#" class="login__form" @submit.prevent="login">
      <label class="login__label">
        <span>Username</span>
        <input
          type="text"
          name="email"
          v-model="username"
          placeholder="Email"
        />
      </label>
      <label class="login__label">
        <span>Password</span>
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

export default {
  data() {
    return {
      username: "",
      password: "",
      serverError: null
    };
  },
  methods: {
    async login() {
      try {
        const payload = {
          username: this.username,
          password: this.password
        };

        const response = await AuthRepository.login(payload);
        // console.log(response);
      } catch (error) {
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
  display: flex;
  justify-content: center;
  align-items: center;
  &__form {
    width: 400px;
    max-width: 100%;
    background-color: rgba(0, 0, 0, 0.03);
    margin: 0 auto;
    padding: 3.5rem;
  }
  &__label {
    display: block;
    margin-bottom: 10px;
    span {
      display: block;
      padding: 0.5rem;
    }
    input {
      display: block;
      width: 100%;
      box-sizing: border-box;
      padding: 0.75rem;
      border: 2px solid black;
      border-radius: 3px;
    }
  }
  &__btn {
    display: block;
    box-sizing: border-box;
    width: 100%;
    padding: 1rem;
    border: none;
    background-color: black;
    font-weight: 500;
    border-radius: 3px;
    text-align: center;
    color: white;
    cursor: pointer;
    transition: all 0.25s;
    &:hover {
      transition: all 0.25s;
      opacity: 0.75ss;
    }
  }
}
</style>
