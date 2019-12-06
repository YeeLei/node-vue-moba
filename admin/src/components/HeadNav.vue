<template>
  <header class="head-nav">
    <el-row>
      <el-col :span="6" class="logo-container">
        <img src="../assets/logo.png" class="logo" alt="" />
        <span class="title">在线后台管理系统</span>
      </el-col>
      <div class="user">
        <div class="userinfo">
          <img :src="user.avatar" class="avatar" alt="" />
          <div class="welcome">
            <span class="name comename">Hi,</span>
            <span class="name avatarname">{{ user.name }}</span>
          </div>
          <span class="username">
            <!-- 下拉箭头 -->
            <el-dropdown trigger="click" @command="setDialogInfo">
              <span class="el-dropdown-link">
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="info">个人信息</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </div>
      </div>
    </el-row>
  </header>
</template>

<script>
export default {
  name: 'head-nav',
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  methods: {
    setDialogInfo(cmdItem) {
      // console.log(cmdItem)
      switch (cmdItem) {
        case 'info':
          this.showInfoList()
          break
        case 'logout':
          this.logout()
          break
      }
    },
    showInfoList() {
      // console.log('个人信息')
      this.$router.push('/infoshow')
    },
    logout() {
      // console.log('退出');
      //清除token
      localStorage.removeItem('token')
      //设置vuex.store
      this.$store.dispatch('clearCurrentState')
      //跳转
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.head-nav {
  width: 100%;
  height: 60px;
  padding: 5px;
  background: #324057;
  color: #fff;
  border-bottom: 1px solid #1f2d3d;
  z-index: 100;
}

.logo-container {
  line-height: 60px;
  min-width: 600px;
}

.logo {
  width: 200px;
  margin-right: 5px;
  vertical-align: middle;
  display: inline-block;
  transform: scale(0.8);
}

.title {
  vertical-align: middle;
  font-size: 22px;
  font-family: 'Microsoft YaHei';
  letter-spacing: 3px;
}

.user {
  float: right;
  height: 50px;
  padding-right: 10px;
}
.userinfo {
  width: 100%;
  line-height: 50px;
  text-align: right;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
  margin-right: 5px;
  transition: all 0.8s;
}
.avatar:hover {
  transform: rotate(360deg);
}
.welcome {
  display: inline-block;
  width: auto;
  line-height: 50px;
  height: 50px;
  vertical-align: middle;
  padding: 0 5px;
}

.name {
  line-height: 20px;
  text-align: center;
  font-size: 14px;
}
.comename {
  font-size: 12px;
  margin-right: 5px;
}

.avatarname {
  color: #409eff;
  font-weight: bolder;
}

.username {
  cursor: pointer;
  margin-right: 5px;
}

.el-dropdown {
  color: #fff;
}
.el-aside {
  color: #333;
}
</style>
