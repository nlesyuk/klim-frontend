import { RepositoryFactory } from "../../repositories/RepositoryFactory";
const PhotosRepository = RepositoryFactory.get("photos");
const CategoriesRepository = RepositoryFactory.get("categories");

export default {
  state: {
    photos: null,
    categories: null
  },
  actions: {
    async getPhotos({ commit }) {
      try {
        const { data } = await PhotosRepository.get();
        commit("setPhotos", data);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    },
    async getCategories({ commit }) {
      try {
        const { data } = await CategoriesRepository.get();
        commit("setPhotos", data);
      } catch (e) {
        // eslint-disable-next-line no-console
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
