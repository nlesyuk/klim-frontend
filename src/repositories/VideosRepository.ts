import Repository from "./Repository";

const resources = "videos";

export default {
  getAllVideos() {
    return Repository.get(`${resources}`);
  },
  getVideo(id) {
    return Repository.get(`${resources}/${id}`);
  }
};
