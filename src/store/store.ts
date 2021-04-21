import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import general from "./modules/general";
import videos from "./modules/videos";

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    init({ dispatch }) {
      dispatch("getContacts");
    }
  },
  modules: {
    general,
    videos
  }
});
