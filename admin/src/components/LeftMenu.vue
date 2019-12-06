<template>
  <el-row class="menu_page">
    <el-col>
      <el-menu router
               :unique-opened="true"
               :default-active="$route.path"
               :collapse="collapse"
               mode="vertical"
               background-color="#324057"
               text-color="#fff"
               active-text-color="#409eff"
               class="el-menu-vertical-demo">
        <div class="user-menu-box"
             v-for="menu in menus"
             :key="menu.id">
          <el-menu-item v-if="!menu.subname"
                        :index="menu.path">
            <i :class="menu.icon"
               style="padding-right:10px"></i>
            <span slot="title"
                  v-text="menu.name"></span>
          </el-menu-item>
          <el-submenu v-if="menu.subname"
                      :index="menu.id">
            <template slot="title">
              <i :class="menu.icon"
                 :w="20"
                 :h="20"
                 style="padding-right:10px"></i>
              <span slot="title"
                    v-text="menu.name"></span>
            </template>
            <el-menu-item-group v-for="(subname,index) in menu.subname"
                                :key="index">
              <template slot="title">{{subname.name}}</template>
              <el-menu-item v-for="(subMenu,index) in subname.child"
                            :key="index"
                            v-text="subMenu.name"
                            :index="subMenu.path">
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </div>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'left-menu',
  data () {
    return {
      activeMenu: '',
      menus: [
        {
          id: '1',
          name: '首页',
          icon: 'fa fa-indent',
          path: '/home'
        },
        {
          id: '2',
          name: '内容管理',
          icon: 'fa fa-bars',
          subname: [
            {
              name: '英雄',
              child: [
                {
                  id: '2-3',
                  path: '/heroes/create',
                  name: '新建英雄'
                },
                {
                  id: '2-4',
                  path: '/heroes/list',
                  name: '英雄列表'
                }
              ]
            },
            {
              name: '文章',
              child: [
                {
                  id: '2-5',
                  path: '/articles/create',
                  name: '新建文章'
                },
                {
                  id: '2-6',
                  path: '/articles/list',
                  name: '文章列表'
                }
              ]
            },
            {
              name: '视频',
              child: [
                {
                  id: '2-9',
                  path: '/picvideos/create',
                  name: '新建视频'
                },
                {
                  id: '2-10',
                  path: '/picvideos/list',
                  name: '视频列表'
                }
              ]
            },
            {
              name: '图文',
              child: [
                {
                  id: '2-7',
                  path: '/picarticles/create',
                  name: '新建图文'
                },
                {
                  id: '2-8',
                  path: '/picarticles/list',
                  name: '图文列表'
                }
              ]
            }
          ]
        },
        {
          id: '3',
          name: '运营管理',
          icon: 'fa fa-calendar-plus-o',
          subname: [
            {
              name: '物品',
              child: [
                {
                  id: '2-1',
                  path: '/goods/create',
                  name: '新建物品'
                },
                {
                  id: '2-2',
                  path: '/goods/list',
                  name: '物品列表'
                }
              ]
            },
            {
              name: '广告',
              child: [
                {
                  id: '3-1',
                  path: '/ads/create',
                  name: '新建广告位'
                },
                {
                  id: '3-2',
                  path: '/ads/list',
                  name: '广告位列表'
                }
              ]
            }
          ]
        },
        {
          id: '4',
          name: '系统设置',
          icon: 'fa fa-cog',
          subname: [
            {
              name: '分类',
              child: [
                {
                  path: '/categories/create',
                  name: '新建分类'
                },
                {
                  path: '/categories/list',
                  name: '分类列表'
                }
              ]
            },
            {
              name: '管理员',
              child: [
                {
                  path: '/admin_users/create',
                  name: '新建管理员'
                },
                {
                  path: '/admin_users/list',
                  name: '管理员列表'
                }
              ]
            }
          ]
        },
        // {
        //   id: '5',
        //   name: '项目情况',
        //   icon: 'fa fa-cog',
        //   subname: [
        //     {
        //       name: '分类详情',
        //       child: [
        //         {
        //           path: '/statistics/list',
        //           name: '分类统计'
        //         }
        //       ]
        //     },
        //   ]
        // }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'collapse'
    ])
  },
}
</script>

<style scoped>
.menu_page {
  position: fixed;
  top: 71px;
  left: 0;
  min-height: 100%;
  background-color: #324057;
  z-index: 99;
}

.el-menu {
  border: none;
}

.fa-margin {
  margin-right: 5px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 400px;
}

.el-menu-vertical-demo {
  width: 40px;
}

.el-submenu .el-menu-item {
  min-width: 180px;
}

.hiddenDropdown,
.hiddenDropname {
  display: none;
}

a {
  text-decoration: none;
}
</style>