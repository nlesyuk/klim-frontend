import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main.vue";
import store from "../store";
// import { mapState } from "vuex";
// import { Store } from "vuex";

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
  const isLoggedIn = store.getters["auth/loggedIn"];
  const privatePages = ["/dashboard"];
  const isAuthRequired = privatePages.includes(to.path);
  const loggedIn = localStorage.getItem("user");

  console.log(">>>>|", isLoggedIn);
  console.log("ROUTER", to.path, loggedIn);
  // trying to access a restricted page + not logged in
  // redirect to login page
  if (isAuthRequired && !loggedIn) {
    next("/login");
  }
  next();
});

export default router;
