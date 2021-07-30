<template>
  <div>
    <ul class="dashboard__list-imgs" v-if="shot">
      <li>
        <span class="dashboard__badge badge-yellow">id: {{ shot.id }}</span>
        <div v-if="shot.workId" class="dashboard__badge badge-green">
          Linked to post-id: {{ shot.workId }}
        </div>

        <img :src="shot.src" alt="preview" />

        <div class="dashboard__select">
          <select v-model="shot.workId">
            <option disabled selected value="null">
              Please linking the Shot to the Work
            </option>
            <option v-for="(item, idx) of videos" :key="idx" :value="item.id">
              {{ item.title }}
            </option>
          </select>
        </div>

        <p class="dashboard__text">Please choose category for this shot:</p>
        <label
          class="dashboard__label mb0"
          v-for="(category, idx) of categories"
          :key="idx"
        >
          <template v-if="!['all'].includes(category)">
            <input
              type="checkbox"
              v-model="selectedCategories"
              :value="category"
            />
            <span class="inline">{{ category }}</span>
          </template>
        </label>

        <button type="button" @click="update" class="dashboard__submit">
          Update shot
        </button>
        <button type="button" @click="close" class="dashboard__submit">
          Close
        </button>
      </li>
    </ul>
    <p v-else class="dashboard__badge badge-red">Something went wrong</p>
  </div>
</template>
<script>
export default {
  props: {
    shot: {
      type: Object,
      required: true
    },
    videos: {
      required: true
    },
    categories: {
      required: true
    }
  },
  data() {
    return {
      selectedCategories: []
    };
  },
  watch: {
    shot() {
      this.updateSelectedCategories();
    }
  },
  methods: {
    update() {
      const { id, src, workId } = this.shot;
      const payload = {
        id,
        src,
        workId,
        category: this.selectedCategories
      };
      this.$emit("updated", payload);
    },
    close() {
      this.selectedCategories = [];
      this.$emit("close");
    },
    updateSelectedCategories() {
      this.selectedCategories = [];
      this.selectedCategories = [...this.shot.category];
    }
  },
  mounted() {
    this.updateSelectedCategories();
  }
};
</script>
