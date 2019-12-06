<template>
  <div class="category">
    <bread></bread>
    <div class="fillcontain">
      <div class="info_container">
        <el-row class="info-row">
          <el-col :span="8"
                  :offset="8">
            <div class="area">
              <p class="title">{{id ? '编辑': '新建'}}分类</p>
              <el-form label-width="100px"
                       @submit.native.prevent="save">
                <el-form-item label="上级分类">
                  <el-select v-model="model.parent"
                             class="select">
                    <el-option v-for="item in parents"
                               :key="item._id"
                               :label="item.name"
                               :value="item._id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="名称">
                  <el-input v-model="model.name"></el-input>
                </el-form-item>
                <el-form-item class="btn">
                  <el-button type="primary"
                             round
                             native-type="submit"
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
      model: {},
      parents: []
    }
  },
  methods: {
    async save () {
      // eslint-disable-next-line no-unused-vars
      let res
      if (this.id) {
        // 如果有id
        res = await this.$http.put(`rest/categories/${this.id}`, this.model)
      } else {
        res = await this.$http.post('rest/categories', this.model)
      }

      this.$router.push('/categories/list')
      this.$message({
        type: 'success',
        message: '保存成功!'
      })
    },
    async fetch () {
      const res = await this.$http.get(`rest/categories/${this.id}`)
      this.model = res.data
    },
    async fetchParents () {
      const res = await this.$http.get(`rest/categories`)
      this.parents = res.data
    }
  },
  created () {
    this.fetchParents()
    this.id && this.fetch()
  },
}
</script>

<style lang="scss">
.category {
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
        .select {
          display: inline;
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