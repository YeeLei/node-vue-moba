<template>
  <div class="wrap">
    <!-- 顶部菜单 -->
    <div class="topbar bg-black py-2 px-3 d-flex ai-center">
      <img src="../assets/logo.png" height="30" />
      <div class="px-3 flex-1">
        <h1 class="text-white fs-md" style="display:inline">王者荣耀</h1>
        <div class="text-grey-1 fs-xxs">团队成就更多</div>
      </div>
      <button type="button" class="btn bg-primary ">立即下载</button>
    </div>
    <!-- 首页导航 -->
    <div class="bg-primary pt-3 pb-2 nav-wrapper">
      <div class="nav nav-inverse jc-around">
        <div class="nav-item active">
          <router-link class="nav-link" tag="div" to="/">首页</router-link>
        </div>
        <div class="nav-item">
          <router-link class="nav-link" tag="div" to="/">攻略中心</router-link>
        </div>
        <div class="nav-item">
          <router-link class="nav-link" tag="div" to="/">赛事中心</router-link>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.wrap {
  position: static;
  width: 100%;
  overflow-x: hidden;
  .topbar {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 999;
  }
  .nav-wrapper {
    margin-top: 3.125rem;
    .nav {
      line-height: 2.3rem;
      height: 2.3rem;
    }
  }
}
</style>
