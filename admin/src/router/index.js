import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'
import Home from '../views/Home.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'
import GoodsEdit from '../views/GoodsEdit.vue'
import GoodsList from '../views/GoodsList.vue'
import HeroEdit from '../views/HeroEdit.vue'
import HeroList from '../views/HeroList.vue'
import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'
import picArticleEdit from '../views/picArticleEdit.vue'
import picArticleList from '../views/picArticleList.vue'
import picVideoEdit from '../views/picVideoEdit.vue'
import picVideoList from '../views/picVideoList.vue'
import AdEdit from '../views/AdEdit.vue'
import AdList from '../views/AdList.vue'
import AdminUser from '../views/AdminUser.vue'
import AdminUserList from '../views/AdminUserList.vue'
import Statistics from '../views/Statistics.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      isPublic: true
    }
  },
  {
    path: '/',
    name: 'main',
    component: Main,
    meta: {
      title: '首页'
    },
    children: [
      { path: '', component: Home },
      { path: '/home', name: 'home', component: Home },
      {
        path: '/categories/create',
        component: CategoryEdit,
        meta: {
          title: '新建分类'
        }
      },
      {
        path: '/categories/edit/:id',
        component: CategoryEdit,
        props: true,
        meta: {
          title: '编辑分类'
        }
      },
      {
        path: '/categories/list',
        component: CategoryList,
        meta: {
          title: '分类列表'
        }
      },
      {
        path: '/goods/create',
        component: GoodsEdit,
        meta: {
          title: '新建物品'
        }
      },
      {
        path: '/goods/edit/:id',
        component: GoodsEdit,
        props: true,
        meta: {
          title: '编辑物品'
        }
      },
      {
        path: '/goods/list',
        component: GoodsList,
        meta: {
          title: '物品列表'
        }
      },
      {
        path: '/heroes/create',
        component: HeroEdit,
        meta: {
          title: '新建英雄'
        }
      },
      {
        path: '/heroes/edit/:id',
        component: HeroEdit,
        props: true,
        meta: {
          title: '编辑英雄'
        }
      },
      {
        path: '/heroes/list',
        component: HeroList,
        meta: {
          title: '英雄列表'
        }
      },
      {
        path: '/articles/create',
        component: ArticleEdit,
        meta: {
          title: '新建文章'
        }
      },
      {
        path: '/articles/edit/:id',
        component: ArticleEdit,
        props: true,
        meta: {
          title: '编辑文章'
        }
      },
      {
        path: '/articles/list',
        component: ArticleList,
        meta: {
          title: '文章列表'
        }
      },
      {
        path: '/picarticles/create',
        component: picArticleEdit,
        props: true,
        meta: {
          title: '新建图文'
        }
      },
      {
        path: '/picarticles/edit/:id',
        component: picArticleEdit,
        props: true,
        meta: {
          title: '编辑图文'
        }
      },
      {
        path: '/picarticles/list',
        component: picArticleList,
        meta: {
          title: '图文列表'
        }
      },
      {
        path: '/picvideos/create',
        component: picVideoEdit,
        props: true,
        meta: {
          title: '新建视频'
        }
      },
      {
        path: '/picvideos/edit/:id',
        component: picVideoEdit,
        props: true,
        meta: {
          title: '编辑视频'
        }
      },
      {
        path: '/picvideos/list',
        component: picVideoList,
        meta: {
          title: '视频列表'
        }
      },
      {
        path: '/ads/create',
        component: AdEdit,
        meta: {
          title: '新建广告位'
        }
      },
      {
        path: '/ads/edit/:id',
        component: AdEdit,
        props: true,
        meta: {
          title: '编辑广告位'
        }
      },
      {
        path: '/ads/list',
        component: AdList,
        meta: {
          title: '广告位列表'
        }
      },
      {
        path: '/admin_users/create',
        component: AdminUser,
        meta: {
          title: '新建管理员'
        }
      },
      {
        path: '/admin_users/edit/:id',
        component: AdminUser,
        props: true,
        meta: {
          title: '编辑管理员'
        }
      },
      {
        path: '/admin_users/list',
        component: AdminUserList,
        meta: {
          title: '管理员列表'
        }
      },
      {
        path: '/statistics/list',
        component: Statistics,
        meta: {
          title: '分类统计'
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/login')
  }
  next()
})
export default router
