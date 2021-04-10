import Repository from "./Repository";

export default {
  getContacts() {
    return Repository.get("contact");
  }
};
