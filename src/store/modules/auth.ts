import { RepositoryFactory } from "../../repositories/RepositoryFactory";
const AuthRepository = RepositoryFactory.get("auth");

const userRaw: string | null = localStorage.getItem("user");
const user: object | null = userRaw ? JSON.parse(userRaw) : null;
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export default {
  namespaced: true,
  state: initialState,
  mutations: {
    loginSuccess(state, user) {
      console.log("loginSuccess");
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    }
  },
  actions: {
    async login({ commit }, user) {
      console.log("login1", user);
      try {
        const res = await AuthRepository.login(user);
        // shoul you move that in service?
        if (res?.data?.accessToken) {
          localStorage.setItem("user", JSON.stringify(res.data));
        }
        console.log("login", res.data);
        commit("loginSuccess", res.data);
        return Promise.resolve(res);
      } catch (error) {
        console.log("loginFF", error);
        commit("loginFailure", error);
        return Promise.reject(error);
      }
    },
    async logout({ commit }) {
      try {
        const res = await AuthRepository.logout();
        console.log("logout", res);
        commit("logout");
      } catch (error) {
        // somthing went wrong with logout
      }
    },
    async register({ commit }, user) {
      try {
        const res = await AuthRepository.register(user);
        console.log("registerSuccess", res);
        commit("registerSuccess", res);
        return Promise.resolve(res);
      } catch (error) {
        commit("registerFailure", error);
        return Promise.reject(error);
      }
    }
  }
};
