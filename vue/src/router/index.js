import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Surveys from "../views/Surveys.vue";
import SurveyView from "../views/SurveyView.vue";

import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import DefaultLayout from "../components/DefaultLayout.vue";
import AuthLayout from "../components/AuthLayout.vue";
import store from "../store";

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    name: "Dashboard",
    component: DefaultLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "/dashboard",
        component: Dashboard,
        name: "Dashboard",
      },
      {
        path: "/surveys",
        component: Surveys,
        name: "Surveys",
      },
      {
        path: "/surveys/create",
        component: SurveyView,
        name: "SurveyCreate",
      },
      {
        path: "/surveys/:id",
        component: SurveyView,
        name: "SurveyView",
      }
  ],
  },
  {
    path: "/auth",
    redirect: "/login",
    name: "Auth",
    component: AuthLayout,
    meta: { isGuest: true },
    children: [
      {
        path: "/login",
        name: "Login",
        component: Login,
      },
      {
        path: "/register",
        name: "Register",
        component: Register,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  // ถ้า current url คือ path ที่ requiresAuth และไม่มี user token จะไปที่ login page
  if (to.meta.requiresAuth && !store.state.user.token) {
    next({ name: "Login" });
  } else if (store.state.user.token && to.meta.isGuest) {
    // ถ้ามี user token และ current url เป็น Children ของ meta.isGuest
    next({ name: "Dashboard" });
  } else {
    next();
  }
  // if (to.matched.some(record => record.meta.requiresAuth)) {
  //   if (store.state.user.token) {
  //     next();
  //     return;
  //   }
  //   next('/login');
  // } else {
  //   next();
  // }
});

export default router;
