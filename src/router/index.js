import Vue from 'vue'
import Router from 'vue-router'

import GoodsList from '@/views/GoodsList'
import Cart from '@/views/Cart'
import Address from '@/views/Address'
import GoodsDetail from "@/views/GoodsDetail";
import Register from "@/views/Register";

Vue.use(Router);

export default new Router({
  base: '/digital-mall/',
  routes: [
    {
      path: '/',
      name: 'GoodsList',
      component:GoodsList
    },
    {
      path: '/cart',
      name: 'Cart',
      component:Cart
    },
    {
      path: '/goods',
      name: 'GoodsList',
      component: GoodsList
    },
    {
      path: '/address',
      name: 'Address',
      component:Address
    },
    {
      path: '/register',
      name: 'Register',
      component:Register
    },
    {
      path: '/detail',
      name: 'Detail',
      component:GoodsDetail
    }
  ]
})
