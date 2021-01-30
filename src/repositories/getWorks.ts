import Repository from './Repository'

const resources = 'works'

export default {
  get () {
    return Repository.get(`${resources}`)
  },
  getPhotos () {
    return Repository.get(`${resources}/photos`)
  },
  getVideos () {
    return Repository.get(`${resources}/videos`)
  },
}