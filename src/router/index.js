import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/blogs",
    name: "Blogs",
    component: () => import("../views/Blogs.vue"),
  },
  {
    path: "/blogs/:id",
    name: "SelectedBlog",
    component: () => import("../views/SelectedBlog.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/Dashboard.vue"),
    beforeEnter(to, form, next) {
      const dataUser = JSON.parse(window.localStorage.sanbercode).auth;
      if (dataUser && dataUser.token) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/blog/create",
    name: "BlogCreate",
    component: () => import("../views/blog/Create.vue"),
    beforeEnter(to, form, next) {
      const dataUser = JSON.parse(window.localStorage.sanbercode).auth;
      if (dataUser && dataUser.token) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/blog/:id/edit",
    name: "BlogEdit",
    component: () => import("../views/blog/Edit.vue"),
    beforeEnter(to, form, next) {
      const dataUser = JSON.parse(window.localStorage.sanbercode).auth;
      if (dataUser && dataUser.token) {
        next();
      } else {
        next("/login");
      }
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
