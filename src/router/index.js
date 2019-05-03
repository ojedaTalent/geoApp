import Vue from 'vue'
import Router from 'vue-router'
import Slideshow from '@/components/slideshow'
import Explore from '@/components/explore'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'slideshow',
      component: Slideshow
    },
    {
      path: '/explore',
      name: 'explore',
      component: Explore
    },

  ]
})
