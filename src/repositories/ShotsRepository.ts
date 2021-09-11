import Repository from "./Repository";

const resources = "shot";

export default {
  getAllShots() {
    return Repository.get(`${resources}`);
  },
  create(payload) {
    return Repository.post(`${resources}`, payload);
  },
  update(payload, id) {
    return Repository.put(`${resources}/${id}`, payload);
  },
  delete(id) {
    return Repository.delete(`${resources}/${id}`);
  }
};
