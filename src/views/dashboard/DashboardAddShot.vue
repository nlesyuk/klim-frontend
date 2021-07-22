<template>
  <section class="dashboard-add-shot">
    <form class="dashboard__form" @submit.prevent="submit">
      <div class="dashboard__label">
        <span>Photos</span>
        <input type="file" multiple @change="getFiles" ref="files" />
        <ul class="dashboard__list-imgs">
          <li v-for="(file, idx) in selectedImages" :key="idx">
            <span class="dashboard__badge badge-yellow">{{ idx + 1 }}</span>
            <button type="button" @click="removeSelectedImage(file.url)">
              delete
            </button>
            <div v-if="file.workId" class="dashboard__badge badge-green">
              Linked to post-id: {{ file.workId }}
            </div>
            <img :src="file.url" alt="preview" />
            <div class="dashboard__select">
              <select v-model="file.workId">
                <option disabled selected value="null">
                  Please linking the Shot to the Work
                </option>
                <option
                  v-for="(item, idx) of videos"
                  :key="idx"
                  :value="item.id"
                >
                  {{ item.title }}
                </option>
              </select>
            </div>
            <div class="dashboard__select">
              <select v-model="file.category">
                <option disabled selected value="null">
                  Please choose category
                </option>
                <option
                  v-for="(name, idx) of category"
                  :key="idx"
                  :value="name"
                >
                  {{ name }}
                </option>
              </select>
            </div>
          </li>
        </ul>
      </div>
      <div class="dashboard__btns-container">
        <button
          type="submit"
          class="dashboard__submit"
          :disabled="!isAllowCreateShots"
        >
          Add shot(s)
        </button>
        <button type="reset" class="dashboard__submit" @click="reset">
          Reset
        </button>
      </div>
    </form>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { RepositoryFactory } from "Repositories/RepositoryFactory.ts";
const ShotsRepository = RepositoryFactory.get("shots");

export default {
  data() {
    return {
      selectedImages: []
    };
  },
  computed: {
    ...mapState({
      videos: state => state.videos.videos,
      category: state => state.shots.category
    }),
    isAllowCreateShots() {
      if (!this.selectedImages.length) {
        return false;
      }
      return this.selectedImages.every(file => file.workId && file.category);
    }
  },
  methods: {
    ...mapActions(["getAllVideos"]),
    getFiles() {
      const files = this.$refs.files.files;

      Array.from(files).forEach(v => {
        this.selectedImages.push({
          file: v,
          workId: null,
          url: URL.createObjectURL(v),
          category: null
        });
      });
    },
    removeSelectedImage(url) {
      this.selectedImages = this.selectedImages.filter(v => v.url != url);
    },
    reset() {
      this.selectedImages = [];
    },
    submit() {
      const formData = new FormData();

      for (const item in this.selectedImages) {
        formData.append("image", item.file);
        formData.append("workId", item.workId);
        formData.append("category", item.category);
      }

      ShotsRepository.create(formData);
    }
  },
  created() {
    if (!this.videos) {
      this.getAllVideos();
    }
  }
};
</script>
