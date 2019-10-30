import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VeeValidate from 'vee-validate';
import helper from './lib/helper.js';
// console.log(VeeValidate);
// import { required } from "vee-validate/dist/rules";

// import { required } from "vee-validate/dist/rules";
import './lib/hotcss.js';

Vue.config.productionTip = false;
// 一个轻量级的vue表单校验的插件
Vue.use(VeeValidate);

router.beforeEach((to, from, next) => {
  console.log(store.getters.getLoginUser);
  console.log(to.path);
  try {
    if (to.path != '/') {
      console.log(helper.getTypes(store.getters.getLoginUser));
      // 权限校验用户是否登陆
      if (helper.getTypes(store.getters.getLoginUser) === 'Object') {
        next();
      } else {
        next('/');
      }
    } else {
      next();
    }
  } catch (e) {
    console.log(e);
  }
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
