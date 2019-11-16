<template>
  <div class="login">
    <div class="form_container">
      <div class="manage_tip">
        <span class="title">王者荣耀在线后台管理</span>
        <el-form :model="loginUser"
                 :rules="rules"
                 ref="loginForm"
                 label-width="80px"
                 status-icon
                 class="loginForm">
          <el-form-item label="邮箱"
                        prop="email">
            <el-input v-model="loginUser.email"
                      placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="密码"
                        prop="password">
            <el-input type="password"
                      v-model="loginUser.password"
                      placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       class="submit_btn"
                       @click="submitForm('loginForm')">登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import jwt_decode from 'jwt-decode';
export default {
  data () {
    return {
      loginUser: {
        email: '',
        password: '',
      },
      rules: {
        email: [
          { type: "email", required: true, message: "邮箱格式不正确", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ],
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post('login', this.loginUser).then(res => {
            const { token } = res.data;
            //存储到ls
            localStorage.setItem('token', token);
            //解析token
            const decoded = jwt_decode(token);
            //token存储到vuex中
            this.$store.dispatch("setAuthenticated", !this.isEmpty(decoded));
            this.$store.dispatch("setUser", decoded);
            //跳转到后台界面
            this.$router.push('/');
            this.$message({
              type: 'success',
              message: '登录成功'
            })
          })
        }
      })
    },
    isEmpty (value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      )
    }
  }
}
</script>
<style lang="scss" scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background: url('../assets/bg.jpg') no-repeat;
  background-size: 100% 100%;
  .form_container {
    width: 400px;
    position: absolute;
    top: 20%;
    left: 34%;
    padding: 25px;
    border-radius: 5px;
    text-align: center;
    .manage_tip {
      .title {
        font-family: 'Microsoft YaHei';
        font-weight: bold;
        font-size: 26px;
        color: #fff;
      }
      .loginForm {
        margin-top: 20px;
        background-color: #fff;
        padding: 30px 40px 20px 0;
        border-radius: 5px;
        box-shadow: 3px 5px 15px #ccc;
        .submit_btn {
          width: 100%;
        }
      }
    }
  }
}
</style>