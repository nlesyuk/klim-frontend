import Repository from "./Repository";

const resources = "videos";

// use CRUD model for build repository
export default {
  getAllVideos() {
    return Repository.get(`${resources}`);
  },
  getVideo(id) {
    return Repository.get(`${resources}/${id}`);
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
