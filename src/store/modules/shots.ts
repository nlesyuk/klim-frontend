import { RepositoryFactory } from "../../repositories/RepositoryFactory";
const RepositoryGeneral = RepositoryFactory.get("shots");

export default {
  state: {
    shots: []
  },
  actions: {
    async getAllShots({ commit }) {
      try {
        const { data } = await RepositoryGeneral.getAllShots();
        commit("setShots", data);
        return Promise.resolve(data);
      } catch (e) {
        console.error(e);
      }
    }
  },
  mutations: {
    setShots(state, shots) {
      state.shots = shots;
    }
  }
};
