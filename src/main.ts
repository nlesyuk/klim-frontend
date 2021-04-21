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
import mixins from "./mixins/index";
Vue.mixin(mixins);

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App),
  mounted() {
    this.$store.dispatch("init");
  }
}).$mount("#app");
