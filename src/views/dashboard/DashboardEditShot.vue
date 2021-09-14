<template>
  <div>
    <ul class="dashboard__list-imgs" v-if="shot">
      <li>
        <span class="dashboard__badge badge-yellow">id: {{ shot.id }}</span>
        <div v-if="shot.workId" class="dashboard__badge badge-green">
          Linked to post-id: {{ shot.workId }}
        </div>

        <button type="button" @click="removeImage">
          delete
        </button>

        <img v-if="shot.src" :src="shot.src" alt="preview" />
        <template v-else>
          <span>Please upload shots</span>
          <input type="file" @change="getFiles" ref="files" />
        </template>

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
          <template>
            <input
              type="checkbox"
              v-model="shot.categories"
              :value="category"
            />
            <span class="inline">{{ category }}</span>
          </template>
        </label>

        <label class="dashboard__label mb0">
          <input
            type="radio"
            name="format"
            value="vertical"
            v-model="shot.format"
          />
          <span class="inline">vertical</span>
        </label>
        <label class="dashboard__label">
          <input
            type="radio"
            name="format"
            value="horizontal"
            v-model="shot.format"
          />
          <span class="inline">horizontal</span>
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
import { mapState } from "vuex";
import { getHeightAndWidthFromDataUrl } from "../../helper";
import { RepositoryFactory } from "Repositories/RepositoryFactory.ts";
const ShotRepository = RepositoryFactory.get("shots");

export default {
  props: {
    shot: {
      type: Object,
      required: true
    },
    videos: {
      required: true
    }
  },
  computed: {
    ...mapState({
      categories: state => state.shots.categories
    })
  },
  methods: {
    removeImage() {
      this.shot.src = "";
    },
    getFiles() {
      const files = this.$refs.files.files;
      Array.from(files).forEach(file => {
        getHeightAndWidthFromDataUrl(file).then(res => {
          this.shot.format = res.height > res.width ? "vertical" : "horizontal";
          this.shot.src = URL.createObjectURL(file);
          this.shot.file = file;
        });
      });
    },
    update() {
      const { id, src, workId, categories, format } = this.shot;
      const payload = {
        id,
        src,
        format,
        workId,
        categories
      };

      console.log("update", payload);
      ShotRepository.update(payload);
    },
    close() {
      this.$emit("close");
    }
  }
};
</script>
