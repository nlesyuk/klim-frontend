import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Photos from "../views/Photos.vue";
import NotFound from "../views/NotFound.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "photo",
    component: Photos,
    children: [
      {
        path: "commerce",
        name: "commerce",
        component: Photos
      }
    ]
  },
  {
    path: "/photo/:id",
    name: "collage",
    component: () => import("../views/Photo.vue")
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("../views/Contact.vue")
  },
  {
    path: "*",
    name: "not-found",
    component: NotFound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
