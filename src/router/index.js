import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import login from '@/components/login'

Vue.use(Router)



const router =  new Router({
  routes: [
    {
      path: '/',
      redirect:'/login'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/index',
      name: 'index',
      component: index
    }
  ]
})

//挂在路由导航守卫
router.beforeEach((to,from,next)=>{
  //to 即将访问的路径
  //form 从哪个路径跳转过来的
  //next 放行函数
  if(to.path === '/login') return next();
  // const tokenStr = window.sessionStorage.getItem('token')
  // if(!tokenStr){
  //   return next('/login')
  // }
  next();

})



export default router