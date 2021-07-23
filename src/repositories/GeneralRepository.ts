import Repository from "./Repository";

export default {
  getContacts() {
    return Repository.get("contact");
  },
  update(payload) {
    return Repository.post(payload);
  }
};
