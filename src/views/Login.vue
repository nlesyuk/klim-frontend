<template>
  <section class="login">
    <form action="#" class="login__form" @submit.prevent="submit">
      <label class="login__label">
        <span>Email</span>
        <input type="email" name="email" v-model="email" placeholder="Email" />
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
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    submit() {
      console.log("1");
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
    transition: all .25s;
    &:hover {
      transition: all .25s;
      opacity: .75ss;
    }
  }
}
</style>
