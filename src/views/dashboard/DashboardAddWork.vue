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
            </li>
          </ul>
        </div>

        <!-- files: edit -->
        <ul class="dashboard__list-imgs" v-if="isEdit">
          <li v-for="(file, idx) in work.photos" :key="idx">
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
          </li>
        </ul>

        <div class="dashboard__btns-container">
          <button type="submit" class="dashboard__submit" v-if="isEdit">
            Update work
          </button>
          <button type="submit" class="dashboard__submit" v-else>
            Add work
          </button>
          <button type="reset" class="dashboard__submit" @click="reset">
            Reset
          </button>
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
      this.editWork();
    }
  },
  data() {
    return {
      title: "",
      credits: "",
      videoId: "",
      description: "",
      selectedImages: []
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
    submit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      if (this.isEdit) {
        // const formData = new FormData();
        // formData.append("title", this.title);
        const payload = {
          title: this.title,
          photos: {
            // use formData for transfer data to server
            new: this.selectedImages,
            existing: this.work.photos
          },
          credits: this.credits,
          description: this.description,
          videos: {
            vimeoId: this.videoId
          }
        };

        VideosRepository.update(payload, this.work.id); // update existing work
      } else {
        const payload = {
          title: this.title,
          photos: this.selectedImages,
          credits: this.credits,
          description: this.description,
          videos: {
            vimeoId: this.videoId
          }
        };

        VideosRepository.create(payload); // create new work
      }
    },
    reset() {
      this.title = this.description = this.credits = this.videoId = "";
      this.$emit("resetForm");
    },
    getFiles() {
      const files = this.$refs.files.files;

      Array.from(files).forEach((file, idx) => {
        this.selectedImages.push({
          file,
          order: idx,
          isPreview: false,
          src: URL.createObjectURL(file)
        });
      });
    },
    removeSelectedImage(src) {
      this.selectedImages = this.selectedImages.filter(v => v.src != src);
    },

    // edit
    editWork() {
      this.title = this.work.title;
      this.credits = this.work.credits;
      this.videoId = this.work.videos.vimeoId;
      this.description = this.work.description;
    }
  },
  mounted() {
    if (this.isEdit) {
      this.editWork();
    }
    // console.log("edit", this.work);
  }
};
</script>
