// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    name: "Login",

    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Users",

        component: () => import("@/views/Users.vue"),
      },

      {
        path: "user/:userId",
        name: "UserDetail",

        component: () => import("@/views/UserDetail.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
