import PhotosRepository from "./PhotosRepository";
import VideosRepository from "./VideosRepository";
import ShotsRepository from "./ShotsRepository";
import GeneralRepository from "./GeneralRepository";

const repositories = {
  videos: VideosRepository,
  photos: PhotosRepository,
  shots: ShotsRepository,
  general: GeneralRepository
};

export const RepositoryFactory = {
  get: name => repositories[name]
};
