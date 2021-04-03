import Repository from "./Repository";

const resources = "photos";

export default {
  getAll() {
    return Repository.get(`${resources}`);
  },
  getPhoto(id) {
    return Repository.get(`${resources}/${id}`);
  }
};
