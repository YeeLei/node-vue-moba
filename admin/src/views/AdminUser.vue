<template>
  <div class="admin">
    <bread></bread>
    <div class="fillcontain">
      <div class="info_container">
        <el-row class="info-row">
          <el-col :span="8"
                  :offset="8">
            <div class="area">
              <p class="title">{{id ? '编辑': '新建'}}管理员</p>
              <el-form label-width="80px"
                       :model="model"
                       :rules="rules"
                       ref="AdminForm"
                       status-icon>
                <el-form-item label="邮箱"
                              prop="email">
                  <el-input v-model="model.email"></el-input>
                </el-form-item>
                <el-form-item label="密码"
                              prop="password">
                  <el-input type="text"
                            v-model="model.password"></el-input>
                </el-form-item>
                <el-form-item label="名字"
                              prop="name">
                  <el-input type="text"
                            v-model="model.name"></el-input>
                </el-form-item>
                <el-form-item label="头像"
                              prop="avatar"
                              style="margin-top:0.5rem;">
                  <el-upload class="avatar-uploader"
                             :action="uploadUrl"
                             :show-file-list="false"
                             :headers="getAuthHeaders()"
                             :on-success="res => $set(model,'avatar',res.url)">
                    <img v-if="model.avatar"
                         :src="model.avatar"
                         class="avatar">
                    <i v-else
                       class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary"
                             round
                             @click="submitForm('AdminForm')"
                             style="float:right;width:100px;">保存</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  props: {
    id: {
      type: String
    }
  },
  data () {
    return {
      model: {
        email: '',
        password: '',
        name: '',
        avatar: ''
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
        password: [
          {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          },
        ],
        name: [
          {
            required: true,
            message: '请输入管理员名字',
            trigger: 'blur'
          }
        ],
        avatar: [
          {
            required: true,
            message: '请上传管理员头像',
            trigger: 'blur'
          }
        ],
      }
    }
  },
  methods: {
    submitForm (AdminForm) {
      this.$refs[AdminForm].validate(valid => {
        if (valid) {
          // eslint-disable-next-line no-unused-vars
          let res
          if (this.id) {
            // 如果有id
            res = this.$http.put(`rest/admin_users/${this.id}`, this.model)
          } else {
            res = this.$http.post('rest/admin_users', this.model)
          }
          this.$router.push('/admin_users/list')
          this.$message({
            type: 'success',
            message: '保存成功!'
          })
        }
      })
    },
    async fetch () {
      const res = await this.$http.get(`rest/admin_users/${this.id}`)
      this.model = res.data
    },
    async fetchParents () {
      const res = await this.$http.get(`rest/admin_users`)
      this.parents = res.data
    }
  },
  created () {
    this.id && this.fetch()
  }
}
</script>

<style lang="scss">
.admin {
  width: 100%;
  height: 100%;
  font-size: 16px;
  box-sizing: border-box;
  background: #f0f2f5;
  .fillcontain {
    padding: 20px;
    .info_container {
      padding: 20px;
      background: #fff;
      box-sizing: border-box;
      overflow: auto;
      .info-row {
        text-align: center;
      }
      .area {
        border: 1px solid #dfdfdf;
        height: 100%;
        font-size: 14px;
        padding: 10px;
        .title {
          text-align: center;
          width: 100%;
          height: 30px;
          line-height: 30px;
          cursor: pointer;
          background-color: #3bc5ff;
          border: 1px solid #3bc5ff;
          color: white;
          display: block;
        }
        .avatar-uploader {
          text-align: left;
        }
        .btn {
          .el-form-item__content {
            margin-left: 0px !important;
          }
        }
      }
    }
  }
}
</style>