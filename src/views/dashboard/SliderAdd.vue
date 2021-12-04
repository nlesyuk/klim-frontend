<template>
  <section class="dashboard-works-add">
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
          <span>Order</span>
          <select v-model="order">
            <option disabled selected value="null">
              Please choose order
            </option>
            <option
              v-for="(work, index) of slidersLength"
              :key="index"
              :value="index"
            >
              {{ index }}
            </option>
          </select>
        </label>

        <!-- upload work -->
        <div class="dashboard__label">
          <span>Upload photo</span>
          <input type="file" @change="getFiles" ref="files" />
        </div>

        <!-- Galerry of uploaded images for add state -->
        <div class="dashboard__label">
          <ul class="dashboard__list-imgs">
            <li v-for="(file, idx) in images" :key="idx">
              <span class="dashboard__badge badge-yellow">{{ idx + 1 }}</span>
              <button type="button" @click="removeSelectedImage(file.src)">
                remove
              </button>

              <img class="mb16" :src="file.src" alt="add" />

              <label class="dashboard__label mb0">
                <input
                  type="radio"
                  :name="`format${idx}`"
                  value="vertical"
                  disabled="disabled"
                  v-model="file.format"
                />
                <span class="inline">vertical</span>
              </label>
              <label class="dashboard__label">
                <input
                  type="radio"
                  :name="`format${idx}`"
                  value="horizontal"
                  disabled="disabled"
                  v-model="file.format"
                />
                <span class="inline">horizontal</span>
              </label>
            </li>
          </ul>
        </div>

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
          <Spiner v-if="isLoading" :isCenter="false" />

          <div class="dashboard__status">
            <div class="dashboard__status--success" v-if="isSuccess">
              Success
            </div>
            <div class="dashboard__status--fail" v-if="serverError">
              Server error: {{ serverError }}
            </div>
          </div>
        </div>
      </div>
      <div class="dashboard__side dashboard__area-preview">
        <div class="dashboard-works-add__preview-cont" v-if="images.length">
          <img
            class="dashboard__img"
            v-for="(item, index) in images"
            :key="index"
            :src="item.src"
            alt=""
          />
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";
import { RepositoryFactory } from "Repositories/RepositoryFactory.ts";
const SlidersRepository = RepositoryFactory.get("sliders");
import { getHeightAndWidthFromDataUrl } from "../../helper/index";

export default {
  props: {
    slide: {
      type: Object
    },
    slides: {
      type: Array
    },
    isEdit: {
      type: Boolean
    }
  },
  components: {},
  watch: {
    slide() {
      this.setDataForEdit();
    }
  },
  data() {
    return {
      title: "slide title",
      order: null,
      images: [],
      // general:
      isLoading: false,
      isSuccess: false,
      clientErrors: [],
      serverError: null
    };
  },
  computed: {
    // base
    slidersLength() {
      const sliders = this.slides;
      if (!sliders) {
        return [0];
      }
      const arr = Array.from(sliders).map(v => v.order);
      return arr?.length
        ? Math.max(...arr) + 2 // 2 bacause we start counting from 0 and need +1 and then +1 again
        : 1;
    }
  },
  validations: {
    title: {
      required,
      minLength: minLength(2)
    }
  },
  methods: {
    reset() {
      this.title = "";
      this.description = "";
      this.credits = "";
      this.videoId = "";
      this.order = null;
      this.images = [];
      this.$emit("resetForm");
    },
    getFiles() {
      this.images = [];
      const files = this.$refs.files.files;

      Array.from(files).forEach((file, idx) => {
        getHeightAndWidthFromDataUrl(file).then(resolution => {
          const format =
            resolution.height > resolution.width ? "vertical" : "horizontal";
          this.images.push({
            file,
            order: idx,
            isPreview: false,
            format,
            src: URL.createObjectURL(file)
          });
        });
      });
    },
    removeSelectedImage(src) {
      this.images = this.images.filter(v => v.src != src);
    },
    setWorkOrder() {
      if (this.isEdit) {
        this.order = this.slide.order;
      }
      if (this.slides) {
        this.order = this.slides.length;
      }
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
    async submit() {
      console.log("submit");

      this.clientErrors = [];
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      return;

      const images = Array.from(this.images);
      if (images.length) {
        const isHasPreview = images.some(v => v.isPreview);
        if (!isHasPreview) {
          this.clientErrors.push("Please choose preview image for the work");
          return;
        }
      } else {
        this.clientErrors.push("Please select at least one image");
        return;
      }

      if (this.isEdit) {
        this.update();
      } else {
        this.create();
      }
    },

    // create
    create() {
      try {
        const formData = new FormData();
        formData.append("title", this.title);
        formData.append("credits", this.credits);
        formData.append("order", this.order);
        formData.append("description", this.description);
        const videos = JSON.stringify({ vimeoId: this.videoId });
        formData.append("videos", videos);

        for (const photo of this.images) {
          formData.append("photos[]", photo.file);
        }
        const photoInfo = JSON.stringify(
          this.images.map(v => ({
            isPreview: v.isPreview,
            fileName: v.file.name,
            format: v.format,
            order: v.order
          }))
        );
        formData.append("photosInfo", photoInfo);

        this.isLoading = true;
        SlidersRepository.create(formData)
          .then(() => {
            this.reset();
            this.setServerStatusInUI(true);
          })
          .catch(e => {
            console.error("AddWork server ERROR", e);
            this.setServerStatusInUI(false, "e.response");
          })
          .finally(() => {
            this.isLoading = false;
            this.clientErrors = [];
          });
      } catch (err) {
        console.error("AddWork ERROR", err);
      }
    },

    // edit
    setDataForEdit() {
      this.title = this.work.title;
      this.credits = this.work.credits;
      this.description = this.work.description;
      this.videoId = this.work.videos.vimeoId;
      this.images = JSON.parse(JSON.stringify(this.work.photos));
    },
    update() {
      const WORK = this.work;
      const formData = new FormData();
      const videos = JSON.stringify({ vimeoId: this.videoId });

      // photos:
      // new
      const newPhotoInfo = this.images
        .filter(v => {
          if (v.file) {
            formData.append("photos[]", v.file);
            return true;
          }
          return false;
        })
        .map(v => ({
          order: v.order,
          format: v.format,
          fileName: v.file.name,
          isPreview: v.isPreview
        }));
      // deleted
      const deletedPhotoIds =
        WORK.deletedPhotoIds?.map(id => id || id === 0) || [];
      // updated
      const updatePhotoInfo =
        this.images?.filter((v, idx) => {
          const isNew = v.file; // means new photo
          const current = JSON.stringify(v);
          const existing = JSON.stringify(WORK.photos[idx]);
          const isUpdated = current != existing;
          return isUpdated && !isNew;
        }) || [];
      // existing
      const existingPhotoInfo = WORK.photos.filter(exphoto => {
        const isUpdated = Array.from(updatePhotoInfo).some(
          upphoto => upphoto.id === exphoto.id
        );
        return !isUpdated;
      });
      // payload
      const photosInfo = {
        new: newPhotoInfo,
        existing: existingPhotoInfo,
        deleted: deletedPhotoIds,
        updated: updatePhotoInfo
      };
      console.log("update", photosInfo);

      // formData:
      formData.append("id", WORK.id);
      formData.append("title", this.title);
      formData.append("videos", videos);
      formData.append("credits", this.credits);
      formData.append("order", this.order);
      formData.append("description", this.description);
      formData.append("photosInfo", JSON.stringify(photosInfo));

      this.isLoading = true;
      SlidersRepository.update(formData)
        .then(() => {
          // this.reset();
          this.setServerStatusInUI(true);
        })
        .catch(e => {
          console.info("Update work ERROR", e);
          this.setServerStatusInUI(false, e.response.statusText);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    deleteExistingImage(id) {
      // this.work.photos = this.work.photos.filter(v => v.id != id);
      this.images = this.images.filter(v => v.id != id);
      if (!id) {
        return;
      }
      if (this.work.deletedPhotoIds) {
        this.work.deletedPhotoIds.push(id);
      } else {
        this.work.deletedPhotoIds = [];
        this.work.deletedPhotoIds.push(id);
      }
    },
    getName(file) {
      return `${file.src}`.split("/").pop();
    }
  },
  mounted() {
    if (this.isEdit) {
      this.setDataForEdit();
    }
    this.setWorkOrder();
  }
};
</script>
