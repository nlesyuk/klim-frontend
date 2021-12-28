<template>
  <section class="dashboard-photos">
    <button
      type="button"
      @click="isShowAddPhoto = !isShowAddPhoto"
      class="dashboard__btn"
    >
      Add photo
    </button>
    <PhotoAdd
      v-if="isShowAddPhoto"
      :photoCollection="photoCollection"
    ></PhotoAdd>

    <button type="button" @click="refresh" class="dashboard__btn">
      Refresh photos
    </button>

    <div class="dashboard-photos__container" v-if="isPhotosFilled > 0">
      <PhotoPreview
        v-for="(item, idx) in photos"
        :key="idx"
        :collection="item"
        :collectionType="idx % 2 ? 'left' : 'right'"
      >
        <ul class="dashboard__list" v-if="isManage">
          <li>
            <button
              type="button"
              class="dashboard__btn-inline"
              @click.prevent="remove(item.id)"
            >
              Remove
            </button>
          </li>
          <li>
            <button
              type="button"
              class="dashboard__btn-inline"
              @click.prevent="edit(item.id)"
            >
              Edit
            </button>
          </li>
          <li>
            <button
              type="button"
              class="dashboard__btn-inline"
              title="id"
              disabled
            >
              {{ item.id }}
            </button>
          </li>
          <li>
            <span
              class="dashboard__badge badge-blue"
              v-for="(category, index) in item.category"
              :key="index"
            >
              {{ category }}
            </span>
          </li>
        </ul>
      </PhotoPreview>
    </div>
    <div v-else-if="isPhotosFilled === 0" class="grid-empty">
      Don't have any items yet
    </div>
    <Spiner v-else />
  </section>
</template>

<script>
import PhotoAdd from "./PhotoAdd";
import PhotoPreview from "../../components/PhotoPreview";
import { mapState, mapActions } from "vuex";
import { RepositoryFactory } from "Repositories/RepositoryFactory.ts";
const PhotosRepository = RepositoryFactory.get("photos");

export default {
  components: {
    PhotoAdd,
    PhotoPreview
  },
  data() {
    return {
      isEdit: false,
      isManage: true,
      isShowAddPhoto: false,
      photoCollection: null
    };
  },
  computed: {
    ...mapState({
      allPhotos: state => state.photos.photos
    }),
    photos() {
      const photos = this.allPhotos;
      if (!photos) {
        return false;
      }

      const res = this.$route.path.includes("commerce")
        ? photos.filter(v => v.category.includes("commerce"))
        : // : photos.filter(v => !v.category.includes("commerce"));
          photos;

      return res.length ? res : this.allPhotos;
    },
    isPhotosFilled() {
      const p = this.photos;
      if (Array.isArray(p)) {
        return p.length;
      }
      return false;
    }
  },
  methods: {
    ...mapActions(["getPhotos"]),
    remove(id) {
      PhotosRepository.delete(id);
    },
    refresh() {
      this.getPhotos();
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
    if (!this.allPhotos) {
      this.getPhotos();
    }
  }
};
</script>

<style></style>
