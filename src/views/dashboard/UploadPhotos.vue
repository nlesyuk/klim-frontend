<template>
  <div class="dashboard__label">
    <!-- upload work -->
    <div class="dashboard__label">
      <span>Upload photos</span>
      <input type="file" multiple @change="getFiles" ref="files" />
    </div>

    <!-- files: edit -->
    <ul class="dashboard__list-imgs" v-if="isEdit">
      <li v-for="(file, idx) in images" :key="idx">
        <span class="dashboard__badge badge-yellow">{{ idx + 1 }}</span>
        <button type="button" @click="deleteExistingImage(file.id)">
          delete
        </button>
        <span>{{ getName(file) }}</span>
        <img :src="file.src" alt="edit" />

        <label class="dashboard__label">
          <span>Please select order of photos if need</span>
          <select v-model="file.order">
            <option disabled selected value="null">
              Please choose order
            </option>
            <option
              v-for="(img, index) of wholeWorkOrders"
              :key="index"
              :value="index"
            >
              {{ index }}
            </option>
          </select>
        </label>

        <label class="dashboard__label">
          <input type="checkbox" v-model="file.isPreview" :value="true" />
          <span class="inline">Is preview photo?</span>
        </label>

        <label class="dashboard__label mb0">
          <input
            type="radio"
            :name="`edit-format${idx}`"
            value="vertical"
            v-model="file.format"
          />
          <span class="inline">vertical</span>
        </label>
        <label class="dashboard__label">
          <input
            type="radio"
            :name="`edit-format${idx}`"
            value="horizontal"
            v-model="file.format"
          />
          <span class="inline">horizontal</span>
        </label>
      </li>
    </ul>

    <!-- files: add -->
    <ul class="dashboard__list-imgs" v-else>
      <!-- items -->
      <li v-for="(file, idx) in images" :key="idx">
        <span class="dashboard__badge badge-yellow">{{ idx + 1 }}</span>
        <button type="button" @click="removeSelectedImage(file)">
          remove
        </button>
        <p
          :class="[
            'dashboard__size',
            {
              oversize: file.file.size / 1024 >= $options.allowedImageSizeInKb
            }
          ]"
        >
          {{ getSize(file.file.size) }}
        </p>

        <p class="dashboard__img-name">{{ file.file.name }}</p>
        <!-- img preview -->
        <img :src="file.src" alt="image preview" />

        <!-- order -->
        <label class="dashboard__label">
          <span>Please select order of photos if need</span>
          <select v-model="file.order">
            <option disabled selected value="null">
              Please choose order
            </option>

            <template v-if="isEdit">
              <option
                v-for="(img, index) of [...images, ...work.photos]"
                :key="index"
                :value="index + 1"
              >
                {{ [...images, ...work.photos].length - index }} -
                {{ index + 1 }}
              </option>
            </template>
            <template v-else>
              <option
                v-for="(img, index) of images"
                :key="index"
                :value="index + 1"
              >
                {{ index + 1 }}
              </option>
            </template>
          </select>
        </label>

        <!-- preview -->
        <label class="dashboard__label">
          <input type="checkbox" v-model="file.isPreview" :value="true" />
          <span class="inline">Is preview photo?</span>
        </label>

        <!-- radio -->
        <label
          v-for="format in photoFormat"
          class="dashboard__label mb0"
          :key="format"
        >
          <input
            type="radio"
            :name="`photo_format-${idx}`"
            :value="format"
            v-model="file.format"
          />
          <span class="inline">{{ format }}</span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
import { getHeightAndWidthFromDataUrl, getName } from "../../helper/index";

export default {
  name: "UploadPhotos",
  props: {
    photoCollection: {
      type: Object
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    images(v) {
      console.log("update img", v);
    }
  },
  data() {
    return {
      // main
      images: [],
      removed: [],
      // additional
      photoFormat: ["vertical", "horizontal"]
    };
  },
  methods: {
    async getFiles() {
      const files = this.$refs.files.files;

      let idx = this.images?.length ?? 0;

      for (const file of files) {
        const resolution = await getHeightAndWidthFromDataUrl(file);
        const format =
          resolution.height > resolution.width ? "vertical" : "horizontal";

        this.images.push({
          file,
          order: idx + 1,
          isPreview: false,
          format,
          src: URL.createObjectURL(file)
        });

        idx++;
      }
    },
    removeSelectedImage(image) {
      if (this.isEdit) {
        this.removed.push(image.id);
      }
      this.images = this.images.filter(v => v.src != image.src);
      console.log("remove", image, this.images);
    },
    getName,
    getSize(sizeInByte) {
      let name = "Kb";
      let size = Math.floor(sizeInByte / 1024); // get Kb
      if (size >= 1024) {
        name = "Mb";
        size = size / 1024; // get Mb
        size = size.toFixed(2);
      }

      return `${size} ${name}`;
    },
    onUpdate() {
      const data = {};
      this.$emit("update");
    }
  }
};
</script>

<style></style>
