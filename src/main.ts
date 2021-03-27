import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

// global components
import Spiner from "./components/Spiner.vue";
Vue.component("Spiner", Spiner);
// plugins
import VueStripeMenu from "vue-stripe-menu";
Vue.use(VueStripeMenu);
import "vue-stripe-menu/dist/vue-stripe-menu.css";

// styles
import "@/scss/style.scss";

Vue.config.productionTip = false;
const mixin = {
  created: function() {
    console.log("mixin hook called");
  }
};

new Vue({
  router,
  store,
  mixins: [mixin],
  render: h => h(App)
}).$mount("#app");
