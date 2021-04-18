import { RepositoryFactory } from "../../repositories/RepositoryFactory";
const RepositoryGeneral = RepositoryFactory.get("general");

export default {
  state: {
    contacts: null
  },
  actions: {
    async getContacts({ commit }) {
      const { data } = await RepositoryGeneral.getContacts();
      commit("setContacts", data);
    }
  },
  mutations: {
    setContacts(state, contacts) {
      state.contacts = contacts;
    }
  }
};
