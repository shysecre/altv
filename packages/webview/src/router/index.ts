import { createRouter, createWebHistory } from "vue-router";
import Interface from "@/views/interface/index.vue";
import LoginPage from "@/views/interface/login.vue";
import RegisterPage from "@/views/interface/register.vue";
import Notification from "@/views/notification.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: Interface },
    { path: "/login", component: LoginPage },
    { path: "/register", component: RegisterPage },
    { path: "/notification", component: Notification }
  ]
});

export default router;
