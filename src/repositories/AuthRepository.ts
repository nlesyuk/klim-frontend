import Repository from "./Repository";
const resources = "auth";

export default {
  login(payload) {
    return Repository.post(`${resources}/signin`, payload);
  },
  register(payload) {
    return Repository.post(`${resources}/signup`, payload);
  },
  logout(payload) {
    return Repository.post(`${resources}/logout`, payload);
  }
};
