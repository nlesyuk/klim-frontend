<template>
  <section class="dashboard-works-add">
    <form
      class="dashboard__form dashboard__form--preview"
      @submit.prevent="submit"
    >
      <div class="dashboard__side">
        <p class="dashboard__text">
          * для корректного відображення всі фото мають бути одного розміру
        </p>
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

        <label
          :class="[
            'dashboard__label',
            {
              'dashboard__label-error': $v.videoId.$dirty && $v.videoId.$error
            }
          ]"
        >
          <span>Vimeo id</span>
          <input type="text" v-model="videoId" />
          <strong
            class="dashboard__label-error-info"
            v-if="$v.videoId.$dirty && $v.videoId.$error"
          >
            Must be min Length
            {{ $v.videoId.$params.minLength.min }}
            and max length
            {{ $v.videoId.$params.maxLength.max }}
          </strong>
        </label>

        <label class="dashboard__label">
          <span>Description under title</span>
          <VueEditor
            id="editor1"
            v-model="description"
            placeholder="description"
          ></VueEditor>
        </label>

        <label class="dashboard__label">
          <span>Credits</span>
          <VueEditor
            id="editor2"
            v-model="credits"
            placeholder="credits"
          ></VueEditor>
        </label>

        <!-- files: add -->
        <div class="dashboard__label">
          <span>Photos</span>
          <input type="file" multiple @change="getFiles" ref="files" />
          <ul class="dashboard__list-imgs">
            <li v-for="(file, idx) in selectedImages" :key="idx">
              <span class="dashboard__badge badge-yellow">{{ idx + 1 }}</span>
              <button type="button" @click="removeSelectedImage(file.src)">
                remove
              </button>
              <img :src="file.src" alt="add" />

              <label class="dashboard__label">
                <span>Please select order of photos if need</span>
                <select v-model="file.order">
                  <option disabled selected value="null">
                    Please choose order
                  </option>

                  <template v-if="isEdit">
                    <option
                      v-for="(img, index) of [
                        ...selectedImages,
                        ...work.photos
                      ]"
                      :key="index"
                      :value="index"
                    >
                      {{ [...selectedImages, ...work.photos].length - index }}
                    </option>
                  </template>
                  <template v-else>
                    <option
                      v-for="(img, index) of selectedImages"
                      :key="index"
                      :value="index"
                    >
                      {{ index }}
                    </option>
                  </template>
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
          <li v-for="(file, idx) in work.photos" :key="idx">
            <span class="dashboard__badge badge-yellow">{{ idx + 1 }}</span>
            <button type="button" @click="deleteExistingImage(file.id)">
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
                  v-for="(img, index) of work.photos"
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

        <!-- work order -->
        <label class="dashboard__label">
          <ul v-if="clientErrors.length" class="dashboard__error-list">
            <li v-for="error in clientErrors" :key="error">
              <span>{{ error }}</span>
            </li>
          </ul>
          <select v-model="workOrder" v-if="worksLength.length">
            <option disabled selected value="null">
              Please choose order
            </option>
            <option
              v-for="(work, index) in worksLength"
              :key="index"
              :value="index"
            >
              {{ index }}
              <template v-if="index + 1 === worksLength">
                (automate setted position)
              </template>
            </option>
          </select>
        </label>

        <div class="dashboard__btns-container">
          <button
            type="submit"
            class="dashboard__submit"
            v-if="isEdit"
            :disabled="isLoading"
          >
            Update work
          </button>
          <button
            type="submit"
            class="dashboard__submit"
            v-else
            :disabled="isLoading"
          >
            Add work
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
              Work was added
            </div>
            <div class="dashboard__status--fail" v-if="serverError">
              Server error: {{ serverError }}
            </div>
          </div>
        </div>
      </div>
      <div class="dashboard__side dashboard__area-preview">
        <div
          class="dashboard-works-add__preview-cont"
          v-if="previewWork && previewWork.photos.length"
        >
          <Work :isPreview="true" :previewWork="previewWork" />
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import Work from "../Work";
import { VueEditor } from "vue2-editor";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import { RepositoryFactory } from "Repositories/RepositoryFactory.ts";
const VideosRepository = RepositoryFactory.get("videos");
import { mapState } from "vuex";
import { getHeightAndWidthFromDataUrl } from "../../helper/index";

export default {
  props: {
    work: {
      type: Object
    },
    isEdit: {
      type: Boolean
    }
  },
  components: {
    Work,
    VueEditor
  },
  watch: {
    work() {
      this.setDataForEdit();
    }
  },
  data() {
    return {
      title: "title",
      credits: "credits",
      videoId: "521769877",
      description: "description",
      workOrder: null,
      selectedImages: [],
      // general:
      isLoading: false,
      isSuccess: false,
      clientErrors: [],
      serverError: null
    };
  },
  computed: {
    previewWork() {
      const workPhotos = this.work?.photos ? this.work.photos : [];
      return {
        title: this.title,
        photos: [...this.selectedImages, ...workPhotos],
        credits: this.credits,
        description: this.description,
        videos: {
          vimeoId: this.videoId
        }
      };
    },
    // base
    ...mapState({
      works: state => state.videos.videos
    }),
    worksLength() {
      if (!this.works) {
        return [];
      }
      const arr = Array.from(this.works).map(v => v.workOrder);
      return Math.max(...arr) + 1;
    }
  },
  validations: {
    title: {
      required,
      minLength: minLength(2)
    },
    description: {
      minLength: minLength(2)
    },
    credits: {
      required,
      minLength: minLength(2)
    },
    videoId: {
      required,
      minLength: minLength(9),
      maxLength: maxLength(20)
    }
  },
  methods: {
    reset() {
      this.title = "";
      this.description = "";
      this.credits = "";
      this.videoId = "";
      this.workOrder = null;
      this.selectedImages = [];
      this.$emit("resetForm");
    },
    getFiles() {
      const files = this.$refs.files.files;

      Array.from(files).forEach((file, idx) => {
        getHeightAndWidthFromDataUrl(file).then(resolution => {
          const format =
            resolution.height > resolution.width ? "vertical" : "horizontal";
          this.selectedImages.push({
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
      this.selectedImages = this.selectedImages.filter(v => v.src != src);
    },
    setWorkOrder() {
      if (this.isEdit) {
        return;
      }
      if (this.works) {
        this.workOrder = this.works.length;
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
      this.clientErrors = [];
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      const images = Array.from(this.selectedImages);
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
        formData.append("workOrder", this.workOrder);
        formData.append("description", this.description);
        const videos = JSON.stringify({ vimeoId: this.videoId });
        formData.append("videos", videos);

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
        VideosRepository.create(formData)
          .then(() => {
            this.reset();
            this.setServerStatusInUI(true);
          })
          .catch(e => {
            console.error("AddWork server ERROR", e);
            this.setServerStatusInUI(false, e.response.statusText);
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
      this.selectedImages = this.work.photos;
    },
    update() {
      const formData = new FormData();
      formData.append("id", this.work.id);
      formData.append("title", this.title);
      formData.append("credits", this.credits);
      formData.append("workOrder", this.workOrder);
      formData.append("description", this.description);
      const videos = JSON.stringify({ vimeoId: this.videoId });
      formData.append("videos", videos);

      for (const photo of this.selectedImages) {
        formData.append("photos[]", photo.file);
      }
      const photoNewInfo = this.selectedImages.map(v => ({
        isPreview: v.isPreview,
        fileName: v.file.name,
        format: v.format,
        order: v.order
      }));
      formData.append(
        "photosInfo",
        JSON.stringify({
          new: photoNewInfo,
          existing: this.work.photos
        })
      );
      formData.append("removedPhotos", JSON.stringify(this.work.removedPhotos));

      this.isLoading = true;
      VideosRepository.update(formData)
        .then(data => {
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
      this.work.photos = this.work.photos.filter(v => v.id != id);
      if (this.work.removedPhotos) {
        this.work.removedPhotos.push(id);
      } else {
        this.work.removedPhotos = [];
        this.work.removedPhotos.push(id);
      }
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
