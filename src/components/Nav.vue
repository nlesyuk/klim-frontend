<template>
  <vsm-menu
    :menu="menu"
    :base-width="380"
    :screen-offset="10"
    element="div"
    handler="hover"
  >
    <template #default="data">
      <component :is="data.item.content" class="content" />
    </template>
    <template #title="data">
      {{ data.item.title }}
    </template>
    <template #after-nav>
      <vsm-mob ref="mobile">
        <div class="vsm-mob-content__mob-menu">
          <router-link class="vsm-link" exact-path :to="{ path: '/' }">
            Photo
          </router-link>
          <!-- <router-link class="vsm-link" exact-path :to="{ path: '/shots' }">
            Shots
          </router-link>
          <router-link class="vsm-link" exact-path :to="{ path: '/photo' }">
            Photo
          </router-link> -->
          <router-link class="vsm-link" exact-path :to="{ path: '/contact' }">
            Contact
          </router-link>
        </div>
      </vsm-mob>
    </template>
  </vsm-menu>
</template>

<script>
import PhotosSubmenu from "./dropdowns/PhotosSubmenu.vue";

export default {
  data() {
    return {
      menu: [
        // 3
        {
          title: "Photo",
          attributes: {
            class: ["header__nav-item"]
          },
          listeners: {
            click: () => {
              if (this.$route.path === "/") return;
              this.$router.push("/");
            }
          },
          dropdown: "PhotosSubmenu",
          content: PhotosSubmenu
        },
        // 4
        {
          title: "Contact",
          attributes: {
            class: ["header__nav-item"]
          },
          listeners: {
            click: () => {
              if (this.$route.path === "/contact") return;
              this.$router.push("/contact");
            }
          }
        }
      ]
    };
  },
  methods: {
    closeMobMenu(e) {
      if (e.target.closest(".vsm-link")) {
        this.$refs["mobile"].closeDropdown();
      }
    }
  },
  mounted() {
    document.addEventListener("click", this.closeMobMenu);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.closeMobMenu);
  }
};
</script>
