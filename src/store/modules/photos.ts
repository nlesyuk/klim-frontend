import { RepositoryFactory } from "../../repositories/RepositoryFactory";
const RepositoryGeneral = RepositoryFactory.get("photos");

export default {
  state: {
    photos: []
  },
  actions: {
    async getAllPhotos({ commit }) {
      try {
        const { data } = await RepositoryGeneral.getAllPhotos();
        commit("setPhotos", data);
      } catch (e) {
        console.error(e);
      }
    }
  },
  mutations: {
    setPhotos(state, photos) {
      state.photos = photos;
    }
  }
};
