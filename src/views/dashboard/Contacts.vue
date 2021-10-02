<template>
  <section class="dashboard-contacts">
    <form class="dashboard__form" @submit.prevent="update">
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
          { 'dashboard__label-error': $v.facebook.$dirty && $v.facebook.$error }
        ]"
      >
        <span>facebook</span>
        <input type="text" v-model="facebook" />
      </label>
      <!--  -->
      <label
        :class="[
          'dashboard__label',
          { 'dashboard__label-error': $v.telegram.$dirty && $v.telegram.$error }
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
            'dashboard__label-error': $v.instagram.$dirty && $v.instagram.$error
          }
        ]"
      >
        <span>instagram</span>
        <input type="text" v-model="instagram" />
      </label>

      <!--  -->
      <div class="dashboard__btns-container">
        <button
          type="submit"
          class="dashboard__submit"
          :disabled="!isAllowUpdate"
        >
          Update contacts
        </button>
        <button type="reset" class="dashboard__submit" @click="reset">
          Reset
        </button>
      </div>
    </form>
  </section>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { mapState, mapActions } from "vuex";
import { RepositoryFactory } from "Repositories/RepositoryFactory.ts";
const GeneralRepository = RepositoryFactory.get("general");

export default {
  data() {
    return {
      email: null,
      phone: null,
      vimeo: null,
      facebook: null,
      telegram: null,
      instagram: null
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
  computed: {
    ...mapState({
      contacts: state => state.general.contacts
    }),
    isAllowUpdate() {
      // return true;
      return (
        this.email &&
        this.phone &&
        this.vimeo &&
        this.facebook &&
        this.telegram &&
        this.instagram
      );
    }
  },
  methods: {
    ...mapActions(["getContacts"]),
    update() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      const payload = {
        email: this.email,
        phone: this.phone,
        vimeo: this.vimeo,
        telegram: this.telegram,
        facebook: this.facebook,
        instagram: this.instagram
      };

      GeneralRepository.updateContacts(payload);
    },
    reset() {
      this.email = null;
      this.phone = null;
      this.vimeo = null;
      this.facebook = null;
      this.telegram = null;
      this.instagram = null;
    },
    setContacts(contacts) {
      if (!contacts) {
        return false;
      }

      const { email, phone, vimeo, facebook, telegram, instagram } = contacts;
      this.email = email;
      this.phone = phone;
      this.vimeo = vimeo;
      this.facebook = facebook;
      this.telegram = telegram;
      this.instagram = instagram;
    }
  },
  created() {
    if (!this.contacts) {
      this.getContacts().then(contacts => {
        this.setContacts(contacts);
      });
    }
    this.setContacts(this.contacts);
  }
};
</script>
