<template>
  <div class="contact">
    <div class="contact__main">
      <figure class="contact__figure">
        <img
          src="@/assets/contact-image.jpg"
          class="contact__img"
          loading="lazy"
        />
      </figure>
      <div class="contact__info" v-if="contacts">
        <span class="contact__text">
          Email
          <a :href="`mailto:${contacts.email}`">{{ contacts.email }}</a>
        </span>
        <span class="contact__text">
          phone number
          <a :href="`tel:${phone}`">{{ contacts.phone }}</a>
        </span>
        <div class="contact__text">
          sociale media
          <ul class="contact__social">
            <li>
              <a :href="contacts.facebook" target="_blank">
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <use xlink:href="#svg-sprite--facebook"></use>
                </svg>
              </a>
            </li>
            <li>
              <a :href="contacts.instagram" target="_blank">
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <use xlink:href="#svg-sprite--instagram"></use>
                </svg>
              </a>
            </li>
            <li>
              <a :href="contacts.telegram" target="_blank">
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <use xlink:href="#svg-sprite--telegram"></use>
                </svg>
              </a>
            </li>
            <li>
              <a :href="contacts.vimeo" target="_blank">
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <use xlink:href="#svg-sprite--vimeo"></use>
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <iframe
      v-if="isActivateCalendar"
      src="https://calendar.google.com/calendar/embed?src=jj25uk5sp09g04sk4g9pru6538%40group.calendar.google.com&ctz=Europe%2FKiev"
      width="800"
      height="600"
      frameborder="0"
      scrolling="no"
    ></iframe>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      isActivateCalendar: false
    };
  },
  computed: {
    phone() {
      if (!this.contacts) return null;
      return this.contacts.phone.replace(/[^\w\s]/gi, "").replace(/\s/gi, "");
    },
    ...mapState({
      contacts: state => state.general.contacts
    })
  },
  methods: {
    ...mapActions(["getContacts"])
  },
  mounted() {
    this.setTitle("Contact");

    // /contact/?calendar=on
    if (this.$route.query.calendar === "on") {
      this.isActivateCalendar = true;
      this.setTitle("Calendar");
    }
    if (!this.contacts) {
      this.getContacts();
    }
  }
};
</script>
