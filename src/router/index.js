import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import User from '../views/User.vue';
import Notice from '../views/Notice.vue';
import NoticeDetail from '../views/NoticeDetail.vue';
import VisitShop from '../views/VisitShop.vue';
import ShopInfo from '../views/ShopInfo.vue';
import Signin from '../views/Signin.vue';
import Order from '../views/Order.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/user',
    name: 'user',
    component: User
  },
  {
    path: '/notice',
    name: 'Notice',
    component: Notice
  },
  {
    path: '/notice/:id',
    name: 'NoticeDetail',
    component: NoticeDetail
  },
  {
    path: '/visitshop',
    name: 'VisitShop',
    component: VisitShop
  },
  {
    path: '/visitshop/:id',
    name: 'ShopInfo',
    component: ShopInfo
  },
  {
    path: '/shopsignin/:id',
    name: 'signin',
    component: Signin
  },
  {
    path: '/order/:id',
    name: 'order',
    component: Order
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
];

const router = new VueRouter({
  routes
});

export default router;
