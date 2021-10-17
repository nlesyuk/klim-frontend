import Repository from "./Repository";

const resources = "photos";

export default {
  create(payload) {
    return Repository.post(`${resources}`, payload);
  },
  get(id) {
    return id
      ? Repository.get(`${resources}/${id}`)
      : Repository.get(`${resources}`);
  },
  update(payload) {
    return Repository.put(`${resources}`, payload);
  },
  delete(id) {
    return Repository.put(`${resources}/${id}`);
  }
  // crud
};
