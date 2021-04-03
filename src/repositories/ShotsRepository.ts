import Repository from "./Repository";

const resources = "shots";

export default {
  get() {
    return Repository.get(`${resources}`);
  }
};
