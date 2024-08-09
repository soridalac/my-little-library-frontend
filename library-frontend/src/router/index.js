import { createRouter, createWebHistory } from "vue-router";
import ViewBooks from "@/views/ViewBooks.vue";
import Home from "@/views/Home.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "mylittlelibrary",
      component: Home,
    },
    {
      path: "/view",
      name: "my books",
      component: ViewBooks,
    },
    {
      path: "/api/books",
      name: "add",
      component: () => import("../views/AddBook.vue"),
    },
    {
      path: "/api/books/:id",
      name: "edit",
      component: () => import("../views/UpdateBook.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Login.vue"),
    },
    {
      path: "/loout",
      name: "logout",
      component: () => import("../views/Logout.vue"),
    },
  ],
});

export default router;
