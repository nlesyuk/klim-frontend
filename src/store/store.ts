import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import general from "./modules/general";

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    init({ dispatch }) {
      dispatch("getContacts");
    }
  },
  modules: {
    general
  }
});
