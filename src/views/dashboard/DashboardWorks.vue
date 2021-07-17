<template>
  <section class="dashbiard">
    <h1 class="datshboard__title">Works</h1>
    <span class="dashboard__badge badge-yellow">add new work</span>
    <form class="dashbiard__form">
      <label class="dashboard__label">
        <span>Title</span>
        <input type="text" v-model="title" />
      </label>
      <label class="dashboard__label">
        <span>Credits</span>
        <input type="text" v-model="credits" />
      </label>
      <label class="dashboard__label">
        <span>Video id</span>
        <input type="text" v-model="videoId" />
      </label>
    </form>
    <span class="dashboard__badge badge-green">all works</span>
  </section>
</template>

<script>
export default {};
</script>

<style></style>
