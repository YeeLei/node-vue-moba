<template>
  <div class="goods">
    <bread></bread>
    <div class="fillcontain">
      <div class="info_container">
        <el-row class="info-row">
          <el-col :span="8"
                  :offset="8">
            <div class="area">
              <p class="title">{{id ? '编辑': '新建'}}物品</p>
              <el-form label-width="80px"
                       :model="model"
                       :rules="rules"
                       ref="GoodsForm"
                       status-icon>
                <el-form-item label="名称"
                              prop="name">
                  <el-input v-model="model.name"></el-input>
                </el-form-item>
                <el-form-item label="图标"
                              prop="icon">
                  <el-upload class="avatar-uploader"
                             :action="uploadUrl"
                             :show-file-list="false"
                             :headers="getAuthHeaders()"
                             :on-success="afterUpload">
                    <img v-if="model.icon"
                         :src="model.icon"
                         class="avatar">
                    <i v-else
                       class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <el-form-item class="btn">
                  <el-button type="primary"
                             round
                             @click="submitForm('GoodsForm')"
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
        icon: '',
        name: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: '物品名称不能为空',
            trigger: 'blur'
          }
        ],
        icon: [
          {
            required: true,
            message: '请上传物品图片',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created () {
    this.id && this.fetch()
  },
  methods: {
    afterUpload (res) {
      // console.log(res)
      this.model.icon = res.url
    },
    submitForm (GoodsForm) {
      this.$refs[GoodsForm].validate(valid => {
        if (valid) {
          // eslint-disable-next-line no-unused-vars
          let res
          if (this.id) {
            // 如果有id
            res = this.$http.put(`rest/goods/${this.id}`, this.model)
          } else {
            res = this.$http.post('rest/goods', this.model)
          }

          this.$router.push('/goods/list')
          this.$message({
            type: 'success',
            message: '保存成功!'
          })
        }
      })
    },
    async fetch () {
      const res = await this.$http.get(`rest/goods/${this.id}`)
      this.model = res.data
    }
  }
}
</script>

<style lang="scss">
.goods {
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
