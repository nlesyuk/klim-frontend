import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Works from "../views/Works.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: Works
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
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  console.log(to, from)
  next()
})

export default router;
