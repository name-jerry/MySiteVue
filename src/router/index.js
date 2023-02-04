import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import TopicsView from "../views/TopicsView.vue";
import FeaturedView from "../views/FeaturedView.vue";
import LabelsView from "../views/LabelsView.vue";
import RecentView from "../views/RecentView.vue";
import FooterView from "../views/FooterView.vue";
import FireView from "../views/FireView.vue";
// vue3的router系统
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      name: "home",
      components: {
        default: HomeView,
        fire: FireView,
        topics: TopicsView,
        featured: FeaturedView,
        labels: LabelsView,
        recent: RecentView,
        footer: FooterView,
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/login.vue"),
    },
    {
      path: "/",
      name: "fire",
      component: FireView,
    },
  ],
});

export default router;
