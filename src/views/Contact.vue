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
      <div class="contact__info">
        <span class="contact__text">
          Email
          <a href="mailto:klimstepan@gmail.com">klimstepan@gmail.com</a>
        </span>
        <span class="contact__text">
          phone number
          <a href="tel:+30992650001">+3(099) 265 00 01</a>
        </span>
        <div class="contact__text">
          sociale media
          <ul class="contact__social">
            <li>
              <a href="//www.facebook.com/stepan.klim/"
                ><svg width="24" height="24" viewBox="0 0 24 24">
                  <use xlink:href="#svg-sprite--facebook"></use></svg
              ></a>
            </li>
            <li>
              <a href="//www.instagram.com/s.klim/"
                ><svg width="24" height="24" viewBox="0 0 24 24">
                  <use xlink:href="#svg-sprite--instagram"></use></svg
              ></a>
            </li>
            <li>
              <a href="//t.me/StepanKlim"
                ><svg width="24" height="24" viewBox="0 0 24 24">
                  <use xlink:href="#svg-sprite--telegram"></use></svg
              ></a>
            </li>
            <li>
              <a href="#"
                ><svg width="24" height="24" viewBox="0 0 24 24">
                  <use xlink:href="#svg-sprite--vimeo"></use></svg
              ></a>
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
export default {
  data() {
    return {
      isActivateCalendar: false
    };
  },
  mounted() {
    // /contact/?calendar=on
    if (this.$route.query.calendar === "on") {
      this.isActivateCalendar = true;
    }
  }
};
</script>
