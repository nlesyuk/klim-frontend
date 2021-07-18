<template>
  <section class="dashboard-add-work">
    <button class="dashboard__btn" @click="isShowForm = !isShowForm">
      add new work
    </button>
    <transition>
      <form class="dashboard__form" @submit.prevent="submit" v-if="isShowForm">
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
          <!-- <p style="margin-top: 40px;">{{ $v.title }}</p> -->
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

        <label class="dashboard__label">
          <span>Photos</span>
          <input type="file" multiple @change="getFiles" ref="files" />
          <img ref="filesPrev" src="#" alt="your image" />
        </label>

        <div class="dashboard__btns-container">
          <button type="submit" class="dashboard__submit">
            Add work
          </button>
          <button type="reset" class="dashboard__submit" @click="reset">
            Reset
          </button>
        </div>
      </form>
    </transition>
  </section>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  props: {
    work: {
      type: Object
    }
  },
  components: {
    VueEditor
  },
  watch: {
    work(v) {
      console.log("work-add", v);
      this.isEdit();
    }
  },
  data() {
    return {
      isShowForm: false,
      title: "",
      description: "",
      credits: "",
      videoId: ""
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
      console.log("test");
    },
    reset() {
      this.title = this.description = this.credits = this.videoId = "";
    },
    isEdit() {
      this.isShowForm = true;
      console.log(this.work);
      this.title = this.work.title;
      this.description = this.work.description;
      this.credits = this.work.credits;
      this.videoId = this.work.videos.vimeo_id;
    },
    getFiles(e) {
      // imgInp.onchange = evt => {
      // const [file] = imgInp.files;
      const res = this.$refs.files.files;
      const [file] = res;
      console.log("files", res, URL.createObjectURL(file));
      if (file) {
        this.$refs.filesPrev.src = URL.createObjectURL(file);
      }
      // };
    }
  }
};
</script>
