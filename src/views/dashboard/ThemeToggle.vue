<template>
  <div class="dashboard__form-item">
    <label class="dashboard__label">
      <span>Choose theme</span>

      <!--  -->
      <div class="dashboard__theme-toggle">
        <label>
          <input type="radio" name="theme" value="light" v-model="theme" />
          <span>light</span>
        </label>
        <label>
          <input type="radio" name="theme" value="dark" v-model="theme" />
          <span>dark</span>
        </label>
        <button type="button" class="dashboard__btn dashboard__btn--m0">
          Apply {{ theme }}
        </button>
      </div>
    </label>
  </div>
</template>

<script>
export default {
  data() {
    return {
      theme: "light"
    };
  }
};
</script>
