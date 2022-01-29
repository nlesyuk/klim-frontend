<template>
  <section class="dashboard-contacts">
    <form
      class="dashboard__form dashboard__form--contacts"
      @submit.prevent="submit"
    >
      <!-- BASE -->
      <div class="dashboard__form-item">
        <!--  -->
        <label
          :class="[
            'dashboard__label',
            { 'dashboard__label-error': $v.email.$dirty && $v.email.$error }
          ]"
        >
          <span>email</span>
          <input type="email" v-model="email" />
        </label>
        <!--  -->
        <label
          :class="[
            'dashboard__label',
            { 'dashboard__label-error': $v.phone.$dirty && $v.phone.$error }
          ]"
        >
          <span>phone</span>
          <input type="text" v-model="phone" />
        </label>
        <!--  -->
        <label
          :class="[
            'dashboard__label',
            { 'dashboard__label-error': $v.vimeo.$dirty && $v.vimeo.$error }
          ]"
        >
          <span>vimeo</span>
          <input type="text" v-model="vimeo" />
        </label>
        <!--  -->
        <label
          :class="[
            'dashboard__label',
            {
              'dashboard__label-error': $v.facebook.$dirty && $v.facebook.$error
            }
          ]"
        >
          <span>facebook</span>
          <input type="text" v-model="facebook" />
        </label>
        <!--  -->
        <label
          :class="[
            'dashboard__label',
            {
              'dashboard__label-error': $v.telegram.$dirty && $v.telegram.$error
            }
          ]"
        >
          <span>telegram</span>
          <input type="text" v-model="telegram" />
        </label>
        <!--  -->
        <label
          :class="[
            'dashboard__label',
            {
              'dashboard__label-error':
                $v.instagram.$dirty && $v.instagram.$error
            }
          ]"
        >
          <span>instagram</span>
          <input type="text" v-model="instagram" />
        </label>
      </div>

      <!-- CREDITS -->
      <div class="dashboard__form-item">
        <label class="dashboard__label">
          <span>Description</span>
          <VueEditor
            class="vue2editor"
            v-model="description"
            placeholder="description"
          ></VueEditor>
        </label>
      </div>

      <!-- PHOTO -->
      <div class="dashboard__form-item">
        <!-- upload work -->
        <div class="dashboard__label">
          <span>Upload photo</span>
          <input type="file" multiple @change="getFiles" ref="files" />
        </div>
        <!-- files: edit -->
        <ul class="dashboard__list-imgs dashboard__list-imgs--single">
          <li v-for="(file, idx) in selectedImages" :key="idx">
            <span class="dashboard__badge badge-yellow">{{ idx + 1 }}</span>
            <!-- <button type="button" @click="selectedImages = []">
              delete
            </button> -->
            <span>{{ getName(file) }}</span>
            <img :src="file.src" alt="edit" />
          </li>
        </ul>
      </div>

      <!-- SUBMIT -->
      <div class="dashboard__btns-container">
        <button
          type="submit"
          class="dashboard__submit"
          :disabled="!isAllowUpdate"
        >
          {{ isContactAlreadyExist ? "Update" : "Create" }}
        </button>
        <button type="reset" class="dashboard__submit" @click="reset">
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
    </form>
  </section>
</template>

<script>
import { getHeightAndWidthFromDataUrl, getName } from "../../helper/index";
import { VueEditor } from "vue2-editor";
import { required } from "vuelidate/lib/validators";
import { mapState, mapActions } from "vuex";
import { RepositoryFactory } from "Repositories/RepositoryFactory.ts";
const GeneralRepository = RepositoryFactory.get("general");

export default {
  data() {
    return {
      // fields
      email: null,
      phone: null,
      vimeo: null,
      facebook: null,
      telegram: null,
      instagram: null,
      description: null,
      selectedImages: [],
      // general
      isContactAlreadyExist: false,
      isLoading: false,
      isSuccess: false,
      clientErrors: [],
      serverError: null
    };
  },
  validations: {
    email: {
      required
    },
    phone: {
      required
    },
    vimeo: {
      required
    },
    facebook: {
      required
    },
    telegram: {
      required
    },
    instagram: {
      required
    }
  },
  components: {
    VueEditor
  },
  computed: {
    ...mapState({
      contacts: state => state.general.contacts
    }),
    isAllowUpdate() {
      return (
        this.email &&
        this.phone &&
        this.vimeo &&
        this.facebook &&
        this.telegram &&
        this.instagram
      );
    },
    // base
    worksLength() {
      if (!this.works) {
        return [];
      }
      const arr = Array.from(this.works).map(v => v.order);
      return arr?.length
        ? Math.max(...arr) + 2 // 2 bacause we start counting from 0 and need +1 and then +1 again
        : 1;
    }
  },
  methods: {
    // base
    ...mapActions(["getContacts"]),
    getFiles() {
      this.selectedImages = [];
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
    reset() {
      this.email = null;
      this.phone = null;
      this.vimeo = null;
      this.facebook = null;
      this.telegram = null;
      this.instagram = null;
      this.description = null;
      this.selectedImages = [];
    },
    setContacts(contacts) {
      if (!contacts) {
        return false;
      }

      const {
        email,
        phone,
        vimeo,
        facebook,
        telegram,
        instagram,
        description,
        image
      } = contacts;

      this.email = email;
      this.phone = phone;
      this.vimeo = vimeo;
      this.facebook = facebook;
      this.telegram = telegram;
      this.instagram = instagram;
      this.description = description ?? "";
      this.selectedImages.push({ src: image });
      this.isContactAlreadyExist = true;
    },
    getName: getName,

    // submit
    submit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      const formData = new FormData();
      formData.append("email", this.email);
      formData.append("phone", this.phone);
      formData.append("vimeo", this.vimeo);
      formData.append("telegram", this.telegram);
      formData.append("facebook", this.facebook);
      formData.append("instagram", this.instagram);
      formData.append("description", this.description);
      const image = this.selectedImages?.[0];
      if (image) {
        formData.append("photos[]", image.file);
      }

      this.isLoading = true;
      if (this.isContactAlreadyExist) {
        // update
        GeneralRepository.updateContacts(formData).finally(() => {
          this.isLoading = false;
        });
      } else {
        // create
        GeneralRepository.createContacts(formData).finally(() => {
          this.isLoading = false;
        });
      }
    }
  },
  created() {
    setTimeout(() => {
      // not good but
      if (!this.contacts) {
        this.getContacts().then(contacts => {
          this.setContacts(contacts);
        });
      }
      this.setContacts(this.contacts);
    }, 0);
  }
};
</script>
