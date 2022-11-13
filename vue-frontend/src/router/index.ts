import { createRouter, createWebHistory } from "vue-router";
import OrdersView from "../views/OrdersView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/orders",
      name: "Home",
    },
    {
      path: "/orders",
      name: "orders",
      component: OrdersView,
    },
  ],
});

export default router;
