import Vue from "vue";
import VueRouter from "vue-router";
import AccueilView from "../views/AccueilView.vue";
import AddView from "../views/AddView.vue";
import SignupView from "../views/SignupView.vue";
import UpdateView from "../views/UpdateView.vue";
import OnepostView from "../views/OnepostView.vue";
import AdminView from "../views/AdminView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "accueil",
    component: AccueilView,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/add",
    name: "add",
    component: AddView,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignupView,
  },
  {
    path: "/onepost/:id",
    name: "onepost",
    component: OnepostView,
  },
  {
    path: "/update/:id",
    name: "update",
    component: UpdateView,
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminView,
  },
];
//component...  
// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
//  component: () => import(/* webpackChunkName: "about" */ '../views/AddView.vue')

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
