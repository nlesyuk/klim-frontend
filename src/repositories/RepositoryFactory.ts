import PhotosRepository from "./PhotosRepository";
import VideosRepository from "./VideosRepository";
import ShotsRepository from "./ShotsRepository";
import GeneralRepository from "./GeneralRepository";
import SlidesRepository from "./SlidesRepository";

const repositories = {
  shots: ShotsRepository,
  videos: VideosRepository,
  photos: PhotosRepository,
  slides: SlidesRepository,
  general: GeneralRepository
};

export const RepositoryFactory = {
  get: name => repositories[name]
};
