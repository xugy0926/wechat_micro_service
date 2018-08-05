import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Signin from '@/components/Signin';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin,
    },
  ],
});
