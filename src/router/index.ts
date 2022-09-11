import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main.vue";
import store from "../store";
import StorageService, { keys } from "../services/storage.service";
const userStorageService = new StorageService(keys.user);

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
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
      path: "/dashboard",
      name: "dashboard",
      meta: {
        isProtected: true
      },
      component: () => import("../views/dashboard/Dashboard.vue"),
      children: [
        {
          path: "slider",
          name: "dasboard-slider",
          meta: { isProtected: true },
          component: () => import("../views/dashboard/Slider.vue")
        },
        {
          path: "works",
          name: "dasboard-works",
          meta: { isProtected: true },
          component: () => import("../views/dashboard/Works.vue")
        },
        {
          path: "shots",
          name: "dasboard-shots",
          meta: { isProtected: true },
          component: () => import("../views/dashboard/Shots.vue")
        },
        {
          path: "photos",
          name: "dasboard-photos",
          meta: { isProtected: true },
          component: () => import("../views/dashboard/Photos.vue")
        },
        {
          path: "contacts",
          name: "dasboard-contacts",
          meta: { isProtected: true },
          component: () => import("../views/dashboard/Contacts.vue")
        }
      ]
    },
    {
      path: "*",
      name: "not-found",
      component: () => import("../views/NotFound.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  // 1
  const isLoggedIn = store.getters["auth/loggedIn"];
  // 2
  const privatePages = ["dashboard"];
  const isAuthRequired = `${to.path}`
    .split("/")
    .some(v => privatePages.includes(v));
  // 3 weak check
  const user = userStorageService.get();
  const hasTokens =
    user?.hasOwnProperty("accessToken") && user?.hasOwnProperty("refreshToken");

  console.log("ROUTER-beforeEach", {
    isLoggedIn,
    isAuthRequired,
    path: to.path,
    user
  });
  // trying to access a restricted page + not logged in
  // redirect to login page
  if (isAuthRequired && !isLoggedIn && !hasTokens) {
    next("/login");
  }
  next();
});

export default router;
