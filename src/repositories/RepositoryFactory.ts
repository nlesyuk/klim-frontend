import PhotosRepository from "./PhotosRepository";
import VideosRepository from "./VideosRepository";
import ShotsRepository from "./ShotsRepository";

const repositories = {
  videos: VideosRepository,
  photos: PhotosRepository,
  shots: ShotsRepository
};

export const RepositoryFactory = {
  get: name => repositories[name]
};
