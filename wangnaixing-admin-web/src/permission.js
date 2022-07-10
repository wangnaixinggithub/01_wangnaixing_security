import router from './router'
import store from './store'
import { Message } from 'element-ui'

// Progress 进度条
import NProgress from 'nprogress'

// Progress 进度条样式
import 'nprogress/nprogress.css'

// 验权
import auth from '@/utils/auth'

// 不重定向白名单
const whiteList = ['/login']


router.beforeEach((to, from, next) => {
  NProgress.start()

  if (auth.getToken()) {

    if (to.path === '/login') {
      //如果当前页面是dashboard，afterEach钩子不会触发，所以手动处理
      next({ path: '/' })
      NProgress.done()

    } else {

      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => { // 拉取用户信息

            let menus=res.data.menus;
            let username=res.data.username;
            store.dispatch('GenerateRoutes', { menus,username }).then(() => { // 生成可访问的路由表
            router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表

            next({ ...to, replace: true })

          })
        }).catch((err) => {

            store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')

            next({ path: '/' })
          })
        })
      } else {

        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {

      next('/login')

      NProgress.done()

    }
  }
})

router.afterEach(() => {
  // 结束Progress
  NProgress.done()
})
