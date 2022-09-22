import { RepositoryFactory } from "../../repositories/RepositoryFactory";
const PhotosRepository = RepositoryFactory.get("photos");
const CategoriesRepository = RepositoryFactory.get("categories");
import {
  photographerCategories,
  cinematographerCategories
} from "@/helper/constants";

const categories =
  process.env.VUE_APP_DOMAIN === "klimstepan.com"
    ? cinematographerCategories
    : photographerCategories;

export default {
  state: {
    photos: null,
    categories: categories
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
