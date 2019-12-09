<template>
  <div class="login">
    <transition name="form-fade">
      <div class="form_container">
        <div class="manage_tip">
          <div class="title">
            <img src="../assets/logo1.png"
                 class="img" />
          </div>
          <el-form :model="loginUser"
                   :rules="rules"
                   ref="loginForm"
                   label-width="80px"
                   status-icon
                   class="loginForm">
            <el-form-item label="邮箱"
                          prop="email">
              <el-input v-model="loginUser.email"
                        placeholder="请输入邮箱">
              </el-input>
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
                         @click="submitForm('loginForm')">SING IN
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import jwt_decode from 'jwt-decode'
export default {
  data () {
    return {
      loginUser: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          {
            type: 'email',
            required: true,
            message: '邮箱格式不正确',
            trigger: 'blur'
          }
        ],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http.post('login', this.loginUser).then(res => {
            const { token } = res.data
            //存储到ls
            localStorage.setItem('token', token)
            //解析token
            const decoded = jwt_decode(token)
            //token存储到vuex中
            this.$store.dispatch('setAuthenticated', !this.isEmpty(decoded))
            this.$store.dispatch('setUser', decoded)
            //跳转到后台界面
            this.$router.push('/')
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
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
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
  .form-fade-enter-active,
  .form-fade-leave-active {
    transition: all 1s;
  }
  .form-fade-enter,
  .form-fade-leave-active {
    transform: translate3d(0, -50px, 0);
    opacity: 0;
  }
  .form_container {
    width: 400px;
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    padding: 25px;
    border-radius: 5px;
    text-align: center;
    .manage_tip {
      position: relative;
      background-color: #fff;
      box-shadow: 3px 5px 15px #ccc;
      border-radius: 5px;
      .title {
        position: absolute;
        top: 20px;
        width: 100%;
        text-align: center;
        font-family: 'Microsoft YaHei';
        font-size: 26px;
        letter-spacing: 2px;
        z-index: 10;
        .img {
          display: inline-block;
          transform: scale(0.9);
          vertical-align: middle;
        }
        span {
          display: inline-block;
          vertical-align: middle;
          margin-left: 5px;
          color: #ff6c60;
        }
      }
      .loginForm {
        margin-top: 20px;
        padding: 100px 40px 20px 0;
        .submit_btn {
          width: 100%;
          background: #facf49;
          border-color: #facf49;
        }
      }
      .tiparea {
        text-align: left;
        font-size: 12px;
        color: #4cbb15;
        .tip {
          margin-left: 54px;
        }
      }
    }
  }
}
</style>
