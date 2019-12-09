<template>
  <div class="article">
    <bread></bread>
    <div class="fillcontain">
      <div class="info_container">
        <el-form label-width="120px"
                 :model="model"
                 :rules="rules"
                 ref="ArticleForm"
                 status-icon>
          <el-form-item label="所属分类"
                        prop="categories">
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
          <el-form-item label="标题"
                        prop="title">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="详情">
            <vue-editor useCustomImageHandler
                        @image-added="handleImageAdded"
                        v-model="model.body">
            </vue-editor>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       round
                       @click="submitForm('ArticleForm')"
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
        categories: [],
        title: ''
      },
      categories: [],
      rules: {
        title: [
          {
            required: true,
            message: '文章标题不能为空',
            trigger: 'blur'
          }
        ],
        categories: [
          {
            required: true,
            message: '请选择文章分类',
            trigger: 'blur'
          }
        ]
      }
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
    submitForm (ArticleForm) {
      this.$refs[ArticleForm].validate(valid => {
        if (valid) {
          // eslint-disable-next-line no-unused-vars
          let res
          if (this.id) {
            // 如果有id,则编辑
            res = this.$http.put(`rest/articles/${this.id}`, this.model)
          } else {
            res = this.$http.post('rest/articles', this.model)
          }

          this.$router.push('/articles/list')
          this.$message({
            type: 'success',
            message: '保存成功!'
          })
        }
      })
    },
    async fetch () {
      const res = await this.$http.get(`rest/articles/${this.id}`)
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
.article {
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
    }
  }
}
</style>