<template>
  <figure class="work">
    <router-link class="work__cont" :to="{ path: '/work/' + work.id }">
      <img :src="work.preview_img" :alt="work.title" class="work__img" />
      <div class="work__description">
        <svg width="24" height="24">
          <use xlink:href="#svg-sprite--video"></use>
        </svg>
        <h2 class="work__title">{{ work.title }}</h2>
      </div>
    </router-link>
  </figure>
</template>

<script>
export default {
  props: {
    work: {
      type: Object,
      required: true
    }
  }
};
</script>
