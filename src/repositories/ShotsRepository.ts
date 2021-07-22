import Repository from "./Repository";

const resources = "shots";

export default {
  getAllShots() {
    return Repository.get(`${resources}`);
  },
  create(payload) {
    // payload<[file: FormData, category: sting, workId: number]>
    return Repository.post(`${resources}`, payload);
  },
  update(payload, id) {
    return Repository.put(`${resources}/${id}`, payload);
  },
  delete(id) {
    return Repository.delete(`${resources}/${id}`);
  }
};
