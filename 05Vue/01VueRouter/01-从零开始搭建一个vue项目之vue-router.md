# 从零开始搭建一个 vue 项目之 vue-router

- [vue-router](https://router.vuejs.org/guide/essentials/dynamic-matching.html)

## router-link 和 router.push()/router.replace()/router.go() 和 router-view 的区别

> 相同点

- router-link 是导航组件（类似于 a 标签）， router.push()/router.replace()/router.go()是导航方法

> 区别

- router-link 是写在 template 里的，router.push()/router.replace()/router.go()是写在 methods 里面的
  - <router-link :to="..."> 等价于 router.push(...)
  - <router-link :to="..." replace> 等价于 router.replace(...)
- router-link router.push()/router.replace()/router.go() 都是用于导航； 而 router-view:匹配后的路由都在 router-view 这里渲染

## this.$router 与 this.$route 的区别

- router 为 VueRouter 实例，主要实现路由的跳转使用
- route 为**当前激活**的路由的状态信息

```js
// Home.vue
export default {
  computed: {
    username() {
      // We will see what `params` is shortly
      return this.$route.params.username
    },
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
  },
}
```

## nested routes 嵌套路由

- 观察 **两处** router-view 被调用的地方

```js
//router.js
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User,
      children: [
        {
          // UserProfile will be rendered inside User's <router-view>
          // when /user/:id/profile is matched
          path: 'profile',
          component: UserProfile
        },
        {
          // UserPosts will be rendered inside User's <router-view>
          // when /user/:id/posts is matched
          path: 'posts',
          component: UserPosts
        }
      ]
    }
  ]
})

// App.vue
<div id="app">
  <router-view></router-view>
</div>

// User.vue
const User = {
  template: `
    <div class="user">
      <h2>User {{ $route.params.id }}</h2>
      <router-view></router-view>
    </div>
  `
}
```

## 路由组件怎么传参 Passing Props to Route Components

- 有三种传参方式：布尔模式/对象模式/函数模式

```js
//布尔模式
// Pass route.params to props
const User = {
  props: ['id'],
  template: '<div>User {{ id }}</div>',
}
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User, props: true },

    // 对于包含命名视图的路由，你必须分别为每个命名视图添加 `props` 选项：
    {
      path: '/user/:id',
      components: { default: User, sidebar: Sidebar },
      props: { default: true, sidebar: false },
    },
  ],
})

//对象模式
// static values
const User = {
  template: '<div>User {{ ’newsletterPopup‘ }}</div>',
}
const router = new VueRouter({
  routes: [{ path: '/promotion/from-newsletter', component: Promotion, props: { newsletterPopup: false } }],
})

// 函数模式
// URL /search?q=vue 会将 {query: 'vue'} 作为属性传递给 SearchUser 组件
const router = new VueRouter({
  routes: [{ path: '/search', component: SearchUser, props: route => ({ query: route.query.q }) }],
})
```

## Lazy Loading Routes 懒加载路由

- 实现一个懒加载路由需要两点：Vue 的异步组件 和 Webpack 的代码分割功能

```js
//1.异步组件的定义
const Foo = () =>
  Promise.resolve({
    /* 组件定义对象 */
  })
//2.动态import来定义代码分割点
import('./Foo.vue') // 返回 Promise

//第一点加上第二点，就是
const Foo = () => import('./Foo.vue')

//最终在router中使用

const router = new VueRouter({
  routes: [{ path: '/foo', component: () => import('./Foo.vue') }],
})

// 把懒加载的图片按组分块
const router = new VueRouter({
  routes: [
    { path: '/foo', component: () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
    { path: '/bar', component: () => import(/* webpackChunkName: "group-foo" */ './Bar.vue')
    { path: '/baz', component: () => import(/* webpackChunkName: "group-foo" */ './Baz.vue')
  ]
})
```

## router 的 hash mode VS history mode

- [History 模式](https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations)
- 如果是 hash mode 的话，就不需要进行任何的配置，如果是 history mode 的话，就需要在服务器端进行配置。
- 因为我们的应用是个单页客户端应用，如果后台没有正确的配置，当用户在浏览器直接访问 http://oursite.com/user/id 就会返回 404。在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，这个页面就是你 app 依赖的页面。

## 一个实例

```js
//src\main.js
import router from './router'

//src\router.js
import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login'
import Index from './views/Index'
import { util } from './util/util'
import GLOBAL from './util/constant'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index2',
      redirect: 'index',
      component: Index,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      redirect: 'bizmodel',
      children: [
        {
          path: '/about',
          name: 'about',
          component: () => import('./views/About'),
        },
        { path: '/config', name: 'config', component: () => import('./views/Config.vue') },
        { path: '/modelDesign', name: 'modelDesign', component: () => import('./views/ModelDesign.vue') },
        {
          path: '/task',
          name: 'task',
          component: () => import('./views/Task.vue'),
        },
        {
          path: '/bizmodel',
          name: 'bizmodel',
          component: () => import('./views/BizModel.vue'),
        },
        {
          path: '/upload',
          name: 'upload',
          component: () => import('./views/Upload.vue'),
        },
        {
          path: '/guide',
          name: 'guide',
          component: () => import('./views/Guide.vue'),
        },
      ],
    },
  ],
})

// 全部页面需要先登录才能操作
router.beforeEach((to, from, next) => {
  let isLogin = null !== util.getLocalData(GLOBAL.USER_SESSION_KEY)
  if (to.path === '/login') {
    next()
  } else {
    isLogin ? next() : next('/login')
  }
})
export default router
```
