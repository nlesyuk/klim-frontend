import Repository from "./Repository";

const resources = "contact";

export default {
  getContacts() {
    return Repository.get(`${resources}`);
  },
  updateContacts(payload) {
    return Repository.put(`${resources}`, payload);
  }
};
