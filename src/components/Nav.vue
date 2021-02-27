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
      <!--Mobile Burger, buttons, etc-->
      <vsm-mob>Mobile Content</vsm-mob>
    </template>
  </vsm-menu>
</template>

<script>
import ShotsSubmenu from "./dropdowns/ShotsSubmenu.vue";

export default {
  data() {
    return {
      menu: [
        // 1
        {
          title: "Works",
          attributes: {
            class: ["header__nav-item"]
          },
          listeners: {
            click: () => {
              this.$router.push("/");
            }
          }
        },
        // 2
        {
          title: "Shots",
          attributes: {
            class: ["header__nav-item"]
          },
          listeners: {
            click: () => {
              this.$router.push("/shots");
            }
          },
          dropdown: "ShotsSubmenu",
          content: ShotsSubmenu
        },
        // 3
        {
          title: "Photo",
          attributes: {
            class: ["header__nav-item"]
          },
          listeners: {
            click: () => {
              this.$router.push("/photo");
            }
          }
        },
        // 4
        {
          title: "Contact",
          attributes: {
            class: ["header__nav-item"]
          },
          listeners: {
            click: () => {
              this.$router.push("/contact");
            }
          }
        }
      ]
    };
  }
};
</script>
