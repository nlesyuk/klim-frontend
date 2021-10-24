import { RepositoryFactory } from "../../repositories/RepositoryFactory";
const PhotosRepository = RepositoryFactory.get("photos");

export default {
  state: {
    photos: null,
    categories: null
  },
  actions: {
    async getPhotos({ commit }) {
      try {
        const { data } = await PhotosRepository.get();
        commit("setPhotos", data.photos);
        commit("setCategories", data.categories);
        console.log("getAllPhotos", data);
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
