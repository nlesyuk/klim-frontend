import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Main from "../views/Main.vue";
import NotFound from "../views/NotFound.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "works",
    component: Main
  },
  {
    path: "/works-commercial",
    name: "works-commercial",
    component: () => import("../views/Main.vue")
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
    component: () => import("../views/Photos.vue"),
    children: [
      {
        path: "commerce",
        name: "commerce",
        component: () => import("../views/Photos.vue")
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
    path: "/calendar",
    name: "calendar",
    component: () => import("../views/Calendar.vue")
  },
  {
    path: "/login",
    name: "login",
    meta: {
      isProtected: true
    },
    component: () => import("../views/Login.vue")
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
