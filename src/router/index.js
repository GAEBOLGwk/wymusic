import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/findmusic'
  },
  {
    path:'/findmusic',
    component: ()=>import('@/views/findmusic')
  },
  {
    path:'/playlist',
    component: ()=>import('@/views/playlist')
  },
  {
    path:'/singlepage',
    component: ()=>import('@/views/singlepage')
  },
  {
    path:'/video',
    component: ()=>import('@/views/video')
  },
  {
    path:'/newvideo',
    component: ()=>import('@/views/newvideo')
  },
  {
    path:'/result',
    component: ()=>import('@/views/result')
  },
  {
    path:'/newmusic',
    component: ()=>import('@/views/newmusic')
  }

]
const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  routes
})

export default router
