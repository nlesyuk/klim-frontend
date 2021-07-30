<template>
  <section class="dashboard-photos">
    <button
      type="button"
      @click="isShowAddPhoto = !isShowAddPhoto"
      class="dashboard__btn"
    >
      Add photo
    </button>
    <AddPhoto
      v-if="isShowAddPhoto"
      :isEdit="isEdit"
      :photoCollection="photoCollection"
    ></AddPhoto>
    <button type="button" @click="refresh" class="dashboard__btn">
      Refresh photos
    </button>

    <div class="dashboard-photos__container" v-if="photos && photos.length">
      <PhotoPreview
        v-for="(photo, idx) in photos"
        :key="idx"
        :collection="photo"
        :collectionType="idx % 2 ? 'left' : 'right'"
      >
        <ul class="dashboard__list" slot="default">
          <li>
            <button type="button" @click.prevent="remove(photo.id)">
              Remove
            </button>
          </li>
          <li>
            <button type="button" @click.prevent="edit(photo.id)">Edit</button>
          </li>
        </ul>
        <ul class="dashboard__list dashboard__list--right" slot="category">
          <li v-for="(category, index) in photo.category" :key="index">
            <span class="dashboard__badge badge-blue">{{ category }}</span>
          </li>
        </ul>
      </PhotoPreview>
    </div>
    <Spiner v-else />
  </section>
</template>

<script>
import AddPhoto from "./DashboardAddPhoto";
import PhotoPreview from "../../components/PhotoPreview";
import { mapState, mapActions } from "vuex";
import { RepositoryFactory } from "Repositories/RepositoryFactory.ts";
const PhotosRepository = RepositoryFactory.get("photos");

export default {
  components: {
    AddPhoto,
    PhotoPreview
  },
  data() {
    return {
      isEdit: false,
      isShowAddPhoto: false,
      photoCollection: null
    };
  },
  computed: {
    ...mapState({
      allPhotos: state => state.photos.photos
    }),
    photos() {
      return this.allPhotos;
      let res;
      if (this.$route.path.includes("commerce")) {
        res = this.allPhotos.filter(v => v.category.includes("commerce"));
      } else {
        res = this.allPhotos.filter(v => !v.category.includes("commerce"));
      }
      return res.length ? res : this.allPhotos;
    }
  },
  methods: {
    ...mapActions(["getAllPhotos"]),
    remove(id) {
      PhotosRepository.delete(id);
    },
    refresh() {
      this.getAllPhotos();
    },
    // edit
    edit(id) {
      this.isEdit = true;
      const item = this.allPhotos.filter(v => v.id === id);
      this.photoCollection = item?.length ? item[0] : null;
      this.isShowAddPhoto = true;

      console.log("photoCollection", this.photoCollection);
    }
  },
  created() {
    if (!this.allPhotos.length) {
      this.getAllPhotos();
    }
  }
};
</script>

<style></style>
