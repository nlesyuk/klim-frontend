<template>
  <section class="dashboard-add-work">
    <form class="dashboard__form" @submit.prevent="submit">
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
        <!-- <p style="margin-top: 40px;">{{ $v.videoId }}</p> -->
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

      <div class="dashboard__label">
        <span>Photos</span>
        <input type="file" multiple @change="getFiles" ref="files" />
        <!-- <img ref="filesPrev" src="#" alt="your image" /> -->
        <ul class="dashboard__list-imgs">
          <li v-for="(file, idx) in selectedImages" :key="idx">
            <span class="dashboard__badge badge-yellow ">{{ idx + 1 }}</span>
            <button type="button" @click="removeSelectedImage(file.url)">
              remove
            </button>
            <img :src="file.url" alt="" />
          </li>
        </ul>
      </div>

      <div class="dashboard__btns-container">
        <button type="submit" class="dashboard__submit">
          Add work
        </button>
        <button type="reset" class="dashboard__submit" @click="reset">
          Reset
        </button>
      </div>
    </form>
  </section>
</template>

<script>
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
    VueEditor
  },
  watch: {
    work(v) {
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
      const payload = {};
      // console.log("submit");
      if (this.isEdit) {
        // update existing work
        VideosRepository.update(payload, id);
      } else {
        // create new work
        VideosRepository.create(payload);
      }
    },
    reset() {
      this.title = this.description = this.credits = this.videoId = "";
      this.$emit("resetForm");
    },
    editWork() {
      this.title = this.work.title;
      this.credits = this.work.credits;
      this.videoId = this.work.videos.vimeo_id;
      this.description = this.work.description;
    },
    getFiles() {
      const files = this.$refs.files.files;

      Array.from(files).forEach(file => {
        this.selectedImages.push({
          file,
          url: URL.createObjectURL(file)
        });
      });
    },
    removeSelectedImage(url) {
      this.selectedImages = this.selectedImages.filter(v => v.url != url);
    }
  },
  mounted() {
    if (this.isEdit) {
      this.editWork();
    }
  }
};
</script>
