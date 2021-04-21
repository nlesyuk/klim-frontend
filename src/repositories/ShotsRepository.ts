import Repository from "./Repository";

const resources = "shots";

export default {
  getAllShots() {
    return Repository.get(`${resources}`);
  }
};
