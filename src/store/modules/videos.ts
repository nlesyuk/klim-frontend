import { RepositoryFactory } from "../../repositories/RepositoryFactory";
const RepositoryGeneral = RepositoryFactory.get("videos");

export default {
  state: {
    videos: null
  },
  actions: {
    async getAllVideos({ commit }) {
      try {
        const { data } = await RepositoryGeneral.getAllVideos();
        commit("setVideos", data);
      } catch (e) {
        console.error(e);
      }
    }
  },
  mutations: {
    setVideos(state, videos) {
      state.videos = videos;
    }
  }
};
