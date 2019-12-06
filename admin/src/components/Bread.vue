<template>
  <div class="bread_container">
    <span class="bars">
      <i class="fa fa-bars"
         @click="isCollapse"></i>
    </span>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="item in levelList"
                          :key="item.path"
                          :to="item.path">
        {{item.meta.title}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      levelList: [],
      collapse: false
    }
  },
  watch: {
    $route () {
      this.getBreadcrumb()
    }
  },
  created () {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb () {
      let matched = this.$route.matched.filter(item => item.meta.title)
      // eslint-disable-next-line no-console
      const first = matched[0];
      if (first && first.name.trim().toLocaleLowerCase() !== 'main'.toLocaleLowerCase()) {
        matched = [{ path: '/goods/create', meta: { title: '新建物品' } }].concat(matched)
      }
      this.levelList = matched
    },
    isCollapse () {
      this.collapse = !this.collapse
      this.setCollapse(this.collapse)
    },
    ...mapMutations({
      setCollapse: 'SET_COLLAPSE'
    })
  }
}
</script>

<style lang="scss">
.bread_container {
  background-color: #eaebec;
  width: 100%;
  height: 30px;
  .bars {
    float: left;
    margin: 4px 10px;
  }
  .el-breadcrumb {
    height: 30px;
    line-height: 30px;
    .el-breadcrumb__inner {
      color: #000;
      &.is-link {
        color: #606266;
      }
    }
  }
}
</style>