import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Dashboard from "../views/Dashboard.vue";
import UserProfile from "../views/UserProfile.vue";
import editUser from "../views/edit-user.vue";
import Unauthorized from "../views/Unauthorized.vue";


function isAuthenticated() {
  return !!localStorage.getItem("user");
}

function isAdmin() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user && user.role == "admin";
}

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  { path: "/login", name: "login", component: Login },
  { path: "/register", name: "register", component: Register },
  {path:'/unauthorized',name:'unauthorized',component:Unauthorized},
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated()) {
        next({ name: "login" });
      } else if (!isAdmin()) {
        next({ name: "profile" });
      } else {
        next();
      }
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: UserProfile,
    beforeEnter: (to, from, next) => {
      isAuthenticated() ? next() : next({ name: "login" });
    },
  },
  {
    path: "/edit-user/:id",
    name: "edit-user",
    component: editUser,
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated()) {
        next({ name: "login" });
      } else if (!isAdmin()) {
        next({ name: "unauthorized" });
      } else {
        next();
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
