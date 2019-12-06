<template>
  <div class="pic-article">
    <bread></bread>
    <div class="fillcontain">
      <div class="info_container">
        <el-form label-width="120px"
                 @submit.native.prevent="save">
          <el-form-item label="所属分类">
            <el-select v-model="model.categories"
                       filterable
                       multiple>
              <el-option v-for="item in categories"
                         :key="item._id"
                         :label="item.name"
                         :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="视频标题">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="视频图片">
            <el-upload class="pic-uploader"
                       :action="uploadUrl"
                       :show-file-list="false"
                       :headers="getAuthHeaders()"
                       :on-success="res=> $set(model, 'pic', res.url)">
              <img v-if="model.pic"
                   :src="model.pic"
                   class="pic">
              <i v-else
                 class="el-icon-plus pic-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="视频详情">
            <vue-editor useCustomImageHandler
                        @image-added="handleImageAdded"
                        v-model="model.body">
            </vue-editor>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       round
                       native-type="submit"
                       style="float:right;width:100px;">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

  </div>
</template>
<script>
import { VueEditor } from "vue2-editor";
export default {
  props: {
    id: {
      type: String
    }
  },
  data () {
    return {
      model: {
        pic: ''
      },
      categories: []
    }
  },
  methods: {
    async handleImageAdded (file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await this.$http.post('upload', formData)
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },
    async save () {
      // eslint-disable-next-line no-unused-vars
      let res
      if (this.id) {
        // 如果有id,则编辑
        res = await this.$http.put(`rest/picvideos/${this.id}`, this.model)
      } else {
        res = await this.$http.post('rest/picvideos', this.model)
      }

      this.$router.push('/picvideos/list')
      this.$message({
        type: 'success',
        message: '保存成功!'
      })
    },
    async fetch () {
      const res = await this.$http.get(`rest/picvideos/${this.id}`)
      this.model = res.data
    },
    async fetchCategories () {
      const res = await this.$http.get(`rest/categories`)
      this.categories = res.data
    },
  },
  created () {
    this.fetchCategories()
    this.id && this.fetch()
  },
  components: {
    VueEditor
  }
}
</script>

<style lang="scss">
.pic-article {
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
      .pic-uploader {
        .el-upload {
          border: 1px dashed #d9d9d9;
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          &:hover {
            border-color: #409eff;
          }
          .pic-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 15rem;
            height: 10rem;
            line-height: 10rem;
            text-align: center;
          }
          .pic {
            width: 15rem;
            height: 10rem;
            display: block;
          }
        }
      }
    }
  }
}
</style>