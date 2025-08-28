import { createRouter, createWebHistory } from "vue-router";
import Interface from "@/views/interface/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{ path: "/", component: Interface }]
});

export default router;
