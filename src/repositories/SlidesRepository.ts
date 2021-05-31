import Repository from "./Repository";

const resources = "slides";

export default {
  get(id) {
    return id
      ? Repository.get(`${resources}/${id}`)
      : Repository.get(`${resources}`);
  }
};
