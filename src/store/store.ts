import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import general from "./modules/general";
import videos from "./modules/videos";
import photos from "./modules/photos";
import shots from "./modules/shots";

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
    videos,
    photos,
    shots
  }
});
