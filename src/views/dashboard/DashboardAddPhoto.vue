<template>
  <section class="dashboard-photos-add">
    <form
      class="dashboard__form dashboard__form--preview"
      @submit.prevent="submit"
    >
      <div class="dashboard__side">
        <label
          :class="[
            'dashboard__label',
            { 'dashboard__label-error': $v.title.$dirty && $v.title.$error }
          ]"
        >
          <span>Title</span>
          <input type="text" v-model="title" />
          <strong
            class="dashboard__label-error-info"
            v-if="$v.title.$dirty && $v.title.$error"
          >
            Min length is {{ $v.title.$params.minLength.min }}
          </strong>
        </label>

        <label class="dashboard__label">
          <span>Сategory</span>
          <select v-model="category">
            <option disabled selected value="null">
              Please choose category
            </option>
            <option v-for="(name, idx) of categories" :key="idx" :value="name">
              {{ name }}
              <template v-if="['commerce'].includes(name)">
                (This category is hidden by default and can be show for users
                which have a custom link)
              </template>
            </option>
          </select>
        </label>

        <div class="dashboard__label">
          <span>Pleae upload photos</span>
          <input type="file" multiple @change="getFiles" ref="files" />
          <ul class="dashboard__list-imgs">
            <li v-for="(file, idx) in selectedImages" :key="idx">
              <span class="dashboard__badge badge-yellow">{{ idx + 1 }}</span>
              <button type="button" @click="removeSelectedImage(file.src)">
                delete
              </button>
              <img :src="file.src" alt="preview" />

              <label class="dashboard__label">
                <span>Please select order of photos if need</span>
                <select v-model="file.order">
                  <option disabled selected value="null">
                    Please choose order
                  </option>
                  <option
                    v-for="(img, index) of selectedImages"
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
                  :name="`format${idx}`"
                  value="vertical"
                  v-model="file.format"
                />
                <span class="inline">vertical</span>
              </label>
              <label class="dashboard__label">
                <input
                  type="radio"
                  :name="`format${idx}`"
                  value="horizontal"
                  v-model="file.format"
                />
                <span class="inline">horizontal</span>
              </label>
            </li>
          </ul>
        </div>

        <div class="dashboard__btns-container">
          <p v-if="isSelectedPreview" class="dashboard__badge badge-red">
            You must select 3 items as preview
          </p>
          <button
            type="submit"
            class="dashboard__submit"
            :disabled="!isAllowCreate"
          >
            Add photo colection
          </button>
          <button type="reset" class="dashboard__submit" @click="reset">
            Reset
          </button>
        </div>
      </div>
      <div class="dashboard__side dashboard__area-preview">
        <div class="photos" v-if="selectedImages.length">
          <GridPhotos :images="selectedImages" />
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import GridPhotos from "../../components/GridPhotos";
import { mapState } from "vuex";
import { required, minLength } from "vuelidate/lib/validators";
import { RepositoryFactory } from "Repositories/RepositoryFactory.ts";
const PhotosRepository = RepositoryFactory.get("photos");

export default {
  components: {
    GridPhotos
  },
  data() {
    return {
      title: null,
      category: null,
      selectedImages: []
    };
  },
  validations: {
    title: {
      required,
      minLength: minLength(2)
    }
  },
  computed: {
    ...mapState({
      categories: state => state.photos.categories
    }),
    isAllowCreate() {
      return (
        this.selectedImages.length &&
        !this.$v.$invalid &&
        this.selectedImages?.filter(v => v.isPreview).length === 3
      );
    },
    isSelectedPreview() {
      return (
        this.selectedImages.length &&
        this.selectedImages?.filter(v => v.isPreview).length !== 3
      );
    }
  },
  watch: {
    selectedImages(v) {
      console.log("selectedImages", v);
    }
  },
  methods: {
    getFiles() {
      const files = this.$refs.files.files;

      function getHeightAndWidthFromDataUrl(dataURL) {
        // dataURL must be created by URL.createObjectURL(file)
        return new Promise(resolve => {
          const img = new Image();
          img.onload = () => {
            resolve({
              height: img.height,
              width: img.width
            });
          };
          img.src = dataURL;
        });
      }

      Array.from(files).forEach((file, idx) => {
        const src = URL.createObjectURL(file);
        getHeightAndWidthFromDataUrl(src).then(resol => {
          const format = resol.height > resol.width ? "vertical" : "horizontal";
          this.selectedImages.push({
            src,
            file,
            order: idx,
            format,
            isPreview: false
          });
        });
      });
    },
    removeSelectedImage(src) {
      this.selectedImages = this.selectedImages.filter(v => v.src != src);
    },
    reset() {
      this.selectedImages = [];
    },
    submit() {
      //
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      console.log("submit");
      // need to send to a server File with info about file in json format

      // const formData = new FormData();
      // formData.append("title", this.title);
      // if (this.category) {
      //   formData.append("category", this.category);
      // }
      // for (const item in this.selectedImages) {
      //   formData.append("category", item.category);
      // }

      // PhotosRepository.create(formData);
    }
  }
};
</script>
