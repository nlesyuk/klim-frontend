<template>
  <div class="photos">
    <div class="shots__tags">
      <button
        type="button"
        v-for="(name, idx) in category"
        :key="idx"
        @click="changeFilter(name)"
        :class="['btn', 'btn-primary', { active: filter === name }]"
      >
        {{ name }}
      </button>
    </div>

    <Spiner v-if="!photos.length" />
    <PhotoPreview
      v-else
      v-for="(photo, idx) in photos"
      :key="idx"
      :collection="photo"
      :collectionType="idx % 2 ? 'left' : 'right'"
    />
  </div>
</template>
<script>
import PhotoPreview from "../components/PhotoPreview";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    PhotoPreview
  },
  data(){
    return {
      category: ["all", "automotive", "fashion", "lifestyle", "personal"],
    }
  },
  computed: {
    filter() {
      return this.$route.query.filter;
    },
    photos() {
      let res;
      if (this.$route.path.includes("commerce")) {
        res = this.allPhotos.filter(v => v.category.includes("commerce"));
      } else {
        res = this.allPhotos.filter(v => !v.category.includes("commerce"));
      }
      return res.length ? res : this.allPhotos;
    },
    ...mapState({
      allPhotos: state => state.photos.photos
    })
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
    ...mapActions(["getAllPhotos"])
  },
  mounted() {
    this.setTitle("Photos");

    if (!this.allPhotos.length) {
      this.getAllPhotos();
    }
  }
};
</script>
