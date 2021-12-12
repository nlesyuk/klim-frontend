<template>
  <ul class="slides" v-if="slides && slides.length">
    <li
      v-for="(item, index) in slides"
      :key="index"
      :class="['slides__item', { 'type-video': item.type === 'video' }]"
    >
      <div class="slides__top">
        <h4 class="slides__title">{{ item.title }}</h4>
        <div class="slides__btns">
          <button type="submit" class="slides__btn" @click="onEdit(item.id)">
            Edit
          </button>
          <button type="button" class="slides__btn" @click="onDelete(item.id)">
            Delete
          </button>
        </div>
      </div>
      <template v-if="item.type === 'image'">
        <img :src="item.image" class="slides__img" />
      </template>
      <template v-else-if="item.type === 'video'">
        <VimeoVideoPlayer :id="item.videos.vimeoId" />
      </template>
      <template v-else> bad type: {{ item.type }} </template>
    </li>
  </ul>
</template>
<script>
import VimeoVideoPlayer from "@/components/VimeoVideoPlayer";
export default {
  props: {
    slides: {
      type: Array,
      required: true
    }
  },
  components: {
    VimeoVideoPlayer
  },
  methods: {
    onEdit(item) {
      console.log("edit", item);
      this.$emit("edit", item);
    },
    onDelete(item) {
      console.log("delete", item);
      this.$emit("delete", item);
    }
  }
};
</script>
<style lang="scss">
.slides {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  &__item {
    display: block;
    width: 100%;
    position: relative;
    &:nth-child(odd) {
      background-color: yellowgreen;
    }
    &:nth-child(even) {
      background-color: yellow;
    }
    &.type-video {
      // display: flex;
      // align-items: center;
    }
  }
  &__top {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0.5rem;
    z-index: 2;
  }
  &__title {
    display: block;
    font: 2rem/1.25 "Open Sans", sans-serif;
    padding: 0.5rem;
    border-radius: 5px;
    background-color: rgba(0, 162, 255, 0.247);
  }
  &__btns {
    display: flex;
    justify-content: space-between;
  }
  &__btn {
    display: inline-block;
    padding: 0.5rem 1rem;
    margin: 0 0.5rem;
    border: 1px solid #ccc;
    border-radius: 3px;
    cursor: pointer;
    &:hover {
      background-color: #ccc;
    }
  }
  &__img {
    display: block;
    max-width: 100%;
    width: 100%;
  }
}
</style>
