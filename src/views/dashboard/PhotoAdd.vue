<template>
  <section class="dashboard-photos-add">
    <form
      class="dashboard__form dashboard__form--preview"
      @submit.prevent="submit"
    >
      <div class="dashboard__side">
        <!-- title -->
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

        <!-- Credits -->
        <label class="dashboard__label">
          <span>Credits</span>
          <VueEditor
            id="editor1"
            v-model="credits"
            placeholder="credits"
          ></VueEditor>
        </label>

        <!-- Description -->
        <label class="dashboard__label">
          <span>Description</span>
          <VueEditor
            id="editor2"
            v-model="description"
            placeholder="description"
          ></VueEditor>
        </label>

        <!-- Сategory -->
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

        <!-- client errors -->
        <label class="dashboard__label">
          <ul v-if="clientErrors.length" class="dashboard__error-list">
            <li v-for="error in clientErrors" :key="error">
              <span>{{ error }}</span>
            </li>
          </ul>
        </label>

        <!-- work order -->
        <label class="dashboard__label">
          <select v-model="order">
            <option disabled selected value="null">
              Please choose order
            </option>
            <option
              v-for="(item, index) in allPhotoCollections"
              :key="index"
              :value="index"
            >
              {{ index }}
              <template v-if="index + 1 === allPhotoCollections">
                (automate setted position)
              </template>
            </option>
          </select>
        </label>

        <!-- btns -->
        <div class="dashboard__btns-container">
          <button
            type="submit"
            class="dashboard__submit"
            v-if="isEdit"
            :disabled="isLoading"
          >
            Update
          </button>
          <button
            type="submit"
            class="dashboard__submit"
            v-else
            :disabled="isLoading"
          >
            Add
          </button>
          <button
            type="reset"
            class="dashboard__submit"
            @click="reset"
            :disabled="isLoading"
          >
            Reset
          </button>
          <!-- server errors/response -->
          <div class="dashboard__status">
            <div class="dashboard__status--success" v-if="isSuccess">
              Success
            </div>
            <div class="dashboard__status--fail" v-if="serverError">
              Server error: {{ serverError }}
            </div>
          </div>
          <Spiner v-if="isLoading" :isCenter="false" />
        </div>
      </div>

      <!-- <div class="dashboard__btns-container">
          <p v-if="isSelectedPreview" class="dashboard__badge badge-red">
            You must select 3 items as preview
          </p>
          <button
            type="submit"
            class="dashboard__submit"
            :disabled="!isAllowCreate"
          >
            Add
          </button>
          <button type="reset" class="dashboard__submit" @click="reset">
            Reset
          </button>
        </div>
      </div> -->

      <!-- PREVIEW -->
      <div class="dashboard__side dashboard__area-preview">
        <div class="photos" v-if="images.length">
          <PhotosGrid :images="images" />
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import PhotosGrid from "../../components/PhotosGrid";
import { VueEditor } from "vue2-editor";
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
      type: Boolean,
      default: false
    }
  },
  components: {
    PhotosGrid,
    VueEditor
  },
  data() {
    return {
      id: null,
      title: "title",
      credits: "credits",
      description: "description",
      category: null,
      selectedImages: [],
      order: null,
      // general:
      isLoading: false,
      isSuccess: false,
      clientErrors: [],
      serverError: null
    };
  },
  validations: {
    title: {
      required,
      minLength: minLength(2)
    }
  },
  watch: {
    allPhotoCollections: {
      handler(v) {
        console.log("111", v);
        if (!this.isEdit) {
          // v is length but order could be length - 1 because it is index
          this.order = v - 1;
        }
      },
      immediate: true
    }
  },
  computed: {
    ...mapState({
      categories: state => state.photos.categories,
      allPhotos: state => state.photos.photos
    }),
    allPhotoCollections() {
      if (!this.allPhotos?.length) {
        return 1;
      }
      return [...this.allPhotos].length + 1;
    },
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
    reset() {
      this.id = null;
      this.title = "";
      this.credits = "";
      this.category = null;
      this.selectedImages = [];
    },
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
    setServerStatusInUI(isSuccess, statusText) {
      if (isSuccess) {
        this.isSuccess = true;
        setTimeout(() => {
          this.isSuccess = false;
          this.$emit("work-create-successfully");
        }, 10 * 1000);
        this.serverError = false;
      } else {
        this.serverError = statusText;
        setTimeout(() => {
          this.serverError = false;
        }, 20 * 1000);
      }
    },

    // send work to a server:
    submit() {
      // validation
      this.clientErrors = [];
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      const images = Array.from(this.selectedImages);
      if (images.length) {
        const isHasPreview = images.filter(v => v.isPreview);
        if (isHasPreview.length != 3) {
          this.clientErrors.push("Please choose 3 preview images");
          return;
        }
      } else {
        this.clientErrors.push("Please select at least one image");
        return;
      }
      if (!this.order) {
        this.clientErrors.push("Please select order");
        return;
      }
      if (!this.title) {
        this.clientErrors.push("Please fill title");
        return;
      }

      // server
      if (this.isEdit) {
        this.update();
      } else {
        this.create();
      }
    },

    // create
    create() {
      console.log("CREATE");
      try {
        const formData = new FormData();
        formData.append("title", this.title);
        formData.append("order", this.order);
        formData.append("credits", this.credits);
        formData.append("description", this.description);

        if (this.category) {
          formData.append("category", this.category);
        }
        for (const photo of this.selectedImages) {
          formData.append("photos[]", photo.file);
        }
        const photoInfo = JSON.stringify(
          this.selectedImages.map(v => ({
            isPreview: v.isPreview,
            fileName: v.file.name,
            format: v.format,
            order: v.order
          }))
        );
        formData.append("photosInfo", photoInfo);

        this.isLoading = true;
        PhotosRepository.create(formData)
          .then(() => {
            this.reset();
            this.setServerStatusInUI(true);
          })
          .catch(e => {
            console.error("PhotosAdd server ERROR", e);
            this.setServerStatusInUI(false, e?.response?.data?.message);
          })
          .finally(() => {
            this.isLoading = false;
            this.clientErrors = [];
          });
      } catch (e) {
        this.serverError = e.message;
        console.error("PhotosAdd server ERROR", e);
      }
    },
    // edit
    update() {
      console.log("UPDATE");
      const formData = new FormData();
      try {
        PhotosRepository.update(formData);
      } catch (e) {
        this.serverError = e.message;
      }
    },
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
