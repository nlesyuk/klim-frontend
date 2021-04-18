import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store/store";

// global components
import Spiner from "./components/Spiner.vue";
Vue.component("Spiner", Spiner);

// plugins
import VueStripeMenu from "vue-stripe-menu";
Vue.use(VueStripeMenu);
import "vue-stripe-menu/dist/vue-stripe-menu.css";

// styles
import "@/scss/style.scss";

// global mixins
Vue.mixin({
  methods: {
    setTitle(title) {
      const el = document.querySelector("title");
      if (el) el.innerText = `${process.env.VUE_APP_NAME} | ${title}`;
    }
  }
});

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App),
  // methods: {}
  mounted() {
    // init();
  }
}).$mount("#app");
