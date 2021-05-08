<template>
  <div class="photos">
    <template v-if="photos && photos.length">
      <PhotoPreview
        v-for="(photo, idx) in photos"
        :key="idx"
        :collection="photo"
        :collectionType="idx % 2 ? 'left' : 'right'"
      />
    </template>
    <p v-else-if="photos && photos.length === 0" class="home__empty-category">
      Don't have any photos yet
    </p>
    <Spiner v-else />
  </div>
</template>
<script>
import PhotoPreview from "../components/PhotoPreview";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    PhotoPreview
  },
  data() {
    return {
      category: ["all", "automotive", "fashion", "lifestyle", "personal"]
    };
  },
  computed: {
    ...mapState({
      allPhotos: state => state.photos.photos
    }),
    photos() {
      let res;
      if (this.$route.path.includes("commerce")) {
        res = this.allPhotos?.filter(v => v.category.includes("commerce"));
      } else {
        // res = this.allPhotos;
        res = this.allPhotos?.filter(v => !v?.category?.includes("commerce"));
      }
      return res && res.length ? res : this.allPhotos;
    }
  },
  methods: {
    changeFilter(filter) {
      this.toggle = false;
      if (this.$route.query.filter !== filter) {
        this.$router.replace({ query: { filter } });
        this.applyFilter(filter);
        setTimeout(() => {
          this.toggle = true;
        }, 300);
      }
    },
    applyFilter(key) {
      this.filteredPhotos =
        key === "all"
          ? this.allPhotos
          : this.allPhotos.filter(item => item.category.includes(key));
    },
    ...mapActions(["getPhotos"])
  },
  created() {
    if (!this.allPhotos) {
      this.getPhotos();
    }
  },
  mounted() {
    this.setTitle("Photos");
  }
};
</script>
