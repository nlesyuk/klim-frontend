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
          <span>Сategory (it's field can be empty)</span>
          <select v-model="category">
            <option disabled selected value="null">
              Please choose category
            </option>
            <option v-for="(name, idx) of categories" :key="idx" :value="name">
              {{ name }}
              <template v-if="['commerce'].includes(name)">
                (This category is hidden by default and can be show for users
                which have the direct link to this category)
              </template>
            </option>
          </select>
          <a
            :href="`//${hostName}/photo/commerce`"
            class="dashboard__link"
            target="_blank"
          >
            Link to the commerce category
          </a>
        </label>

        <!-- files: add -->
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
                    v-for="(img, index) of images"
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

        <!-- files: edit -->
        <ul class="dashboard__list-imgs" v-if="isEdit">
          <li v-for="(file, idx) in photoCollection.photos" :key="idx">
            <span class="dashboard__badge badge-yellow">{{ idx + 1 }}</span>
            <button type="button" @click="removeSelectedImage(file.src)">
              delete
            </button>
            <img :src="file.src" alt="edit" />

            <label class="dashboard__label">
              <span>Please select order of photos if need</span>
              <select v-model="file.order">
                <option disabled selected value="null">
                  Please choose order
                </option>
                <option
                  v-for="(img, index) of images"
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
          </li>
        </ul>

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
        <div class="photos" v-if="images.length">
          <GridPhotos :images="images" />
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
  props: {
    photoCollection: {
      type: Object
    },
    isEdit: {
      type: Boolean
    }
  },
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
    hostName() {
      return window.location.host;
    },
    images() {
      return this.isEdit
        ? [...this.selectedImages, ...this.photoCollection.photos]
        : this.selectedImages;
    },
    isAllowCreate() {
      return (
        this.images.length &&
        !this.$v.$invalid &&
        this.images?.filter(v => v.isPreview).length === 3
      );
    },
    isSelectedPreview() {
      return (
        this.selectedImages.length &&
        this.selectedImages?.filter(v => v.isPreview).length !== 3
      );
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
      // console.log("submit");
      // need to send to a server File with info about file in json format

      // const formData = new FormData();
      // formData.append("title", this.title);
      // if (this.category) {
      //   formData.append("category", this.category);
      // }
      // for (const item in this.selectedImages) {
      //   formData.append("category", item.category);
      // }

      if (this.isEdit) {
        // const formData = new FormData();
        // formData.append("title", this.title);
        const payload = {
          title: this.title,
          category: this.category?.length ? this.category : [],
          photos: {
            // use formData for transfer data to server
            new: this.selectedImages,
            existing: this.photoCollection.photos
          }
        };

        PhotosRepository.update(payload, this.photoCollection.id); // update existing
      } else {
        const payload = {
          title: this.title,
          category: this.category?.length ? this.category : [],
          photos: this.selectedImages // those object contain files
        };
        PhotosRepository.create(formData);
      }
    },
    // edit
    editePhotoCollection() {
      this.title = this.photoCollection.title;
      if (this.photoCollection.category?.length) {
        console.log();
        this.category = this.photoCollection.category[0];
      }
    }
  },
  mounted() {
    if (this.isEdit) {
      this.editePhotoCollection();
    }
  }
};
</script>
