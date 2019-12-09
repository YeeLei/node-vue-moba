<template>
  <div class="ads">
    <bread></bread>
    <div class="fillcontain">
      <div class="info_container">
        <div class="area">
          <el-form label-width="120px"
                   :model="model"
                   :rules="rules"
                   ref="AdsForm"
                   status-icon>
            <el-form-item label="名称"
                          prop="name">
              <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label="广告">
              <el-button size="small"
                         @click="model.items.push({})">
                <i class="el-icon-plus"></i>
                添加广告
              </el-button>
            </el-form-item>
            <el-form-item>
              <el-row type="flex"
                      style="flex-wrap: wrap">
                <el-col :md="10"
                        v-for="(item,index) in model.items"
                        :key="index"
                        style="padding:0 10px; margin-bottom:3rem;">
                  <el-tabs type="border-card"
                           value="basic">
                    <div style="text-align:center; margin-bottom: 10px;">广告{{index+1}}</div>
                    <el-form-item label="跳转链接 (URL)">
                      <el-input v-model="item.url"></el-input>
                    </el-form-item>
                    <el-form-item label="图片"
                                  style="margin-top:0.5rem;">
                      <el-upload class="avatar-uploader"
                                 :action="uploadUrl"
                                 :show-file-list="false"
                                 :headers="getAuthHeaders()"
                                 :on-success="res => $set(item,'image',res.url)">
                        <img v-if="item.image"
                             :src="item.image"
                             class="avatar">
                        <i v-else
                           class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </el-form-item>
                    <el-form-item style="text-align:right;">
                      <el-button size="small"
                                 type="danger"
                                 @click="remove(index)">删除</el-button>
                    </el-form-item>
                  </el-tabs>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"
                         round
                         @click="submitForm('AdsForm')"
                         style="float:right;width:100px;">保存</el-button>
            </el-form-item>
          </el-form>
        </div>
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
        name: '',
        items: [{
          url: '',
          image: ''
        }]
      },
      rules: {
        name: [
          {
            required: true,
            message: '广告名称不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    remove (index) {
      this.$confirm(`是否确定要删除该广告?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.model.items.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    submitForm (AdsForm) {
      this.$refs[AdsForm].validate(valid => {
        if (valid) {
          // eslint-disable-next-line no-unused-vars
          let res
          if (this.id) {
            // 如果有id
            res = this.$http.put(`rest/ads/${this.id}`, this.model)
          } else {
            res = this.$http.post('rest/ads', this.model)
          }

          this.$router.push('/ads/list')
          this.$message({
            type: 'success',
            message: '保存成功!'
          })
        }
      })
    },
    async fetch () {
      const res = await this.$http.get(`rest/ads/${this.id}`)
      this.model = Object.assign({}, this.model, res.data)
    }
  },
  created () {
    this.id && this.fetch()
  },
}
</script>
<style lang="scss" scoped>
.ads {
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
      .area {
        border: 1px solid #dfdfdf;
        height: 100%;
        font-size: 14px;
        padding: 10px;
      }
    }
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  min-width: 15rem;
  height: 13rem;
  line-height: 13rem;
  text-align: center;
}
.avatar {
  min-width: 15rem;
  height: 13rem;
  display: block;
}
</style>