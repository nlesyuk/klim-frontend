import { RepositoryFactory } from "../../repositories/RepositoryFactory";
const RepositoryGeneral = RepositoryFactory.get("general");

export default {
  state: {
    contacts: null
  },
  actions: {
    async getContacts({ commit }) {
      try {
        const { data } = await RepositoryGeneral.getContacts();
        commit("setContacts", data);
      } catch (e) {
        console.error(e);
      }
    }
  },
  mutations: {
    setContacts(state, contacts) {
      state.contacts = contacts;
    }
  }
};
