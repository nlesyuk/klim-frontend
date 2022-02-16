import { RepositoryFactory } from "../../repositories/RepositoryFactory";
const AuthRepository = RepositoryFactory.get("auth");

// is in progress
export default {
  state: {
    user: null,
    isAuthenticated: false
  },
  actions: {
    async login({ commit }, payload) {
      try {
        const { data } = await AuthRepository.login(payload);
        console.log("Auth", data);
        commit("setContacts", data);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    }
  }
};
