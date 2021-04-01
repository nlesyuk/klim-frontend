<template>
  <figure class="work">
    <img :src="work.preview_img" :alt="work.title" class="work__img" />
    <router-link class="work__title" :to="{ path: '/work/' + work.id }">
      <svg width="24" height="24">
        <use xlink:href="#svg-sprite--video"></use>
      </svg>
      {{ work.title }}
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
