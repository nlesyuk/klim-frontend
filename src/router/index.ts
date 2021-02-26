import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Works from "../views/Works.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "works",
    component: () => import("../views/Works.vue")
  },
  {
    path: "/work/:id",
    name: "work",
    component: () => import("../views/Work.vue")
  },
  {
    path: "/shots",
    name: "shots",
    component: () => import("../views/Shots.vue")
  },
  {
    path: "/photo",
    name: "photo",
    component: () => import("../views/Photo.vue")
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("../views/Contact.vue")
  },
  {
    path: "/calendar",
    name: "calendar",
    component: () => import("../views/Calendar.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
