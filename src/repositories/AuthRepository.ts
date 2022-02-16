import Repository from "./Repository";
const resources = "auth";

export default {
  login(payload) {
    return Repository.post(`${resources}/login`, payload);
  },
  registration(payload) {
    return Repository.post(`${resources}/registration`, payload);
  },
  reset(payload) {
    return Repository.post(`${resources}/reset`, payload);
  }
};
