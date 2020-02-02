import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    { path: "/", name: "home", component: () => import("@/view//home") },
    {
      path: "/notify",
      name: "notify",
      component: () => import("@/view/components/notify")
    },
    {
      path: "/today",
      name: "today",
      component: () => import("@/view/components/today")
    },
    {
      path: "/left",
      name: "left",
      component: () => import("@/view/components/left")
    },
    {
      path: "/pank",
      name: "pank",
      component: () => import("@/view/components/pank")
    },
    {
      path: "/newsDetail",
      name: "newsDetail",
      component: () => import("@/view/components/NewsDetail")
    },
    {
      path: "/suspension",
      name: "suspension",
      component: () => import("@/view/components/suspension")
    }
  ]
});
