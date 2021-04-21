export default {
  methods: {
    setTitle(title) {
      const el = document.querySelector("title");
      if (el) el.innerText = `${process.env.VUE_APP_NAME} | ${title}`;
    }
  }
};
