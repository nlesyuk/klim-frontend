import { RepositoryFactory } from "../../repositories/RepositoryFactory";
const RepositoryGeneral = RepositoryFactory.get("photos");

export default {
  state: {
    photos: [],
    categories: null
  },
  actions: {
    async getAllPhotos({ commit }) {
      try {
        const { data } = await RepositoryGeneral.getAllPhotos();
        commit("setPhotos", data.collections);
        commit("setCategories", data.categories);
      } catch (e) {
        console.error(e);
      }
    }
  },
  mutations: {
    setPhotos(state, photos) {
      state.photos = photos;
    },
    setCategories(state, photos) {
      state.categories = photos;
    }
  }
};
