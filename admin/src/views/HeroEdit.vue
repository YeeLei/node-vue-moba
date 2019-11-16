<template>
  <div class="hero">
    <bread></bread>
    <div class="fillcontain">
      <div class="info_container">
        <el-form label-width="120px"
                 @submit.native.prevent="save">
          <el-tabs type="border-card"
                   value="basic">
            <el-tab-pane label="基础信息"
                         name="basic">
              <el-form-item label="英雄名称">
                <el-input v-model="model.name"></el-input>
              </el-form-item>
              <el-form-item label="英雄称号">
                <el-input v-model="model.title"></el-input>
              </el-form-item>
              <el-form-item label="英雄头像">
                <el-upload class="avatar-uploader"
                           :action="uploadUrl"
                           :show-file-list="false"
                           :headers="getAuthHeaders()"
                           :on-success="res=> $set(model, 'avatar', res.url)">
                  <img v-if="model.avatar"
                       :src="model.avatar"
                       class="avatar">
                  <i v-else
                     class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="Banner">
                <el-upload class="banner-uploader"
                           :action="uploadUrl"
                           :show-file-list="false"
                           :headers="getAuthHeaders()"
                           :on-success="res=> $set(model, 'banner', res.url)">
                  <img v-if="model.banner"
                       :src="model.banner"
                       class="banner">
                  <i v-else
                     class="el-icon-plus banner-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="英雄类型">
                <el-select v-model="model.categories"
                           multiple>
                  <el-option v-for="item of categories"
                             :key="item._id"
                             :label="item.name"
                             :value="item._id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="难度评分">
                <el-rate style="margin-top: 0.75rem"
                         :max="9"
                         show-score
                         v-model="model.scores.difficult">
                </el-rate>
              </el-form-item>
              <el-form-item label="技能评分">
                <el-rate style="margin-top: 0.75rem"
                         :max="9"
                         show-score
                         v-model="model.scores.skills">
                </el-rate>
              </el-form-item>
              <el-form-item label="攻击评分">
                <el-rate style="margin-top: 0.75rem"
                         :max="9"
                         show-score
                         v-model="model.scores.attack">
                </el-rate>
              </el-form-item>
              <el-form-item label="生存评分">
                <el-rate style="margin-top: 0.75rem"
                         :max="9"
                         show-score
                         v-model="model.scores.survive">
                </el-rate>
              </el-form-item>
              <el-form-item label="顺风出装">
                <el-select v-model="model.items1"
                           multiple>
                  <el-option v-for="item of items"
                             :key="item._id"
                             :label="item.name"
                             :value="item._id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="逆风出装">
                <el-select v-model="model.items2"
                           multiple>
                  <el-option v-for="item of items"
                             :key="item._id"
                             :label="item.name"
                             :value="item._id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="使用技巧">
                <el-input type="textarea"
                          v-model="model.usageTips"></el-input>
              </el-form-item>
              <el-form-item label="对抗技巧">
                <el-input type="textarea"
                          v-model="model.battleTips"></el-input>
              </el-form-item>
              <el-form-item label="团战思路">
                <el-input type="textarea"
                          v-model="model.teamTips"></el-input>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="技能"
                         name="skills">
              <el-button size="small"
                         @click="model.skills.push({})">
                <i class="el-icon-plus"></i>
                添加技能
              </el-button>
              <el-row type="flex"
                      style="flex-wrap: wrap">
                <el-col :md="12"
                        v-for="(item,index) in model.skills"
                        :key="index">
                  <div style="text-align:center; margin-bottom: 10px;">技能{{index+1}}</div>
                  <el-form-item label="名称">
                    <el-input v-model="item.name"></el-input>
                  </el-form-item>
                  <el-form-item label="图标">
                    <el-upload class="avatar-uploader"
                               :action="uploadUrl"
                               :show-file-list="false"
                               :headers="getAuthHeaders()"
                               :on-success="res => $set(item,'icon',res.url)">
                      <img v-if="item.icon"
                           :src="item.icon"
                           class="avatar">
                      <i v-else
                         class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </el-form-item>
                  <el-form-item label="冷却值">
                    <el-input v-model="item.delay"></el-input>
                  </el-form-item>
                  <el-form-item label="消耗">
                    <el-input v-model="item.cost"></el-input>
                  </el-form-item>
                  <el-form-item label="描述">
                    <el-input type="textarea"
                              v-model="item.description"></el-input>
                  </el-form-item>
                  <el-form-item label="小提示">
                    <el-input type="textarea"
                              v-model="item.tips"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button size="small"
                               type="danger"
                               @click="remove(index)">删除</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="最佳搭档"
                         name="partners">
              <el-button size="small"
                         @click="model.partners.push({})">
                <i class="el-icon-plus"></i> 添加英雄
              </el-button>
              <el-row type="flex"
                      style="flex-wrap: wrap">
                <el-col :md="12"
                        v-for="(item, index) in model.partners"
                        :key="index">
                  <el-form-item label="英雄">
                    <el-select filterable
                               v-model="item.hero">
                      <el-option v-for="hero in heroes"
                                 :key="hero._id"
                                 :value="hero._id"
                                 :label="hero.name">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="描述">
                    <el-input v-model="item.description"
                              type="textarea"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button size="small"
                               type="danger"
                               @click="removePartner(index)">删除</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="被谁克制"
                         name="badPartners">
              <el-button size="small"
                         @click="model.badPartners.push({})">
                <i class="el-icon-plus"></i> 添加英雄
              </el-button>
              <el-row type="flex"
                      style="flex-wrap: wrap">
                <el-col :md="12"
                        v-for="(item, index) in model.badPartners"
                        :key="index">
                  <el-form-item label="英雄">
                    <el-select filterable
                               v-model="item.hero">
                      <el-option v-for="hero in heroes"
                                 :key="hero._id"
                                 :value="hero._id"
                                 :label="hero.name">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="描述">
                    <el-input v-model="item.description"
                              type="textarea"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button size="small"
                               type="danger"
                               @click="removeBadPartner(index)">删除</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="克制谁"
                         name="restrains">
              <el-button size="small"
                         @click="model.restrains.push({})">
                <i class="el-icon-plus"></i> 添加英雄
              </el-button>
              <el-row type="flex"
                      style="flex-wrap: wrap">
                <el-col :md="12"
                        v-for="(item, index) in model.restrains"
                        :key="index">
                  <el-form-item label="英雄">
                    <el-select filterable
                               v-model="item.hero">
                      <el-option v-for="hero in heroes"
                                 :key="hero._id"
                                 :value="hero._id"
                                 :label="hero.name">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="描述">
                    <el-input v-model="item.description"
                              type="textarea"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button size="small"
                               type="danger"
                               @click="removeRestrains(index)">删除</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
          <el-form-item style="margin-top: 1rem;">
            <el-button type="primary"
                       native-type="submit">保存</el-button>
          </el-form-item>
        </el-form>
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
      categories: [],
      items: [],
      heroes: [],
      partners: [],
      model: {
        name: '',
        avatar: '',
        scores: {
          difficult: 0
        },
        skills: [],
        partners: [],
        badPartners: [],
        restrains: []
      }
    }
  },
  methods: {
    remove (index) {
      const name = this.model.skills[index].name || '(空)'
      this.$confirm(`是否确定要删除技能 ${name}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.model.skills.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.fetchItems()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    removePartner (index) {
      this.$confirm(`是否确定要删除该搭档?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.model.partners.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.fetchHeroes()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    removeBadPartner (index) {
      this.$confirm(`是否确定要删除该被克制的英雄?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.model.badPartners.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.fetchHeroes()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    removeRestrains (index) {
      this.$confirm(`是否确定要删除该克制的英雄?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.model.restrains.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.fetchHeroes()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    async save () {
      // eslint-disable-next-line no-unused-vars
      let res
      if (this.id) {
        // 如果有id
        res = await this.$http.put(`rest/heroes/${this.id}`, this.model)
      } else {
        res = await this.$http.post('rest/heroes', this.model)
      }
      this.$message({
        type: 'success',
        message: '保存成功!'
      })
    },
    async fetch () {
      const res = await this.$http.get(`rest/heroes/${this.id}`)
      this.model = Object.assign({}, this.model, res.data)
    },
    async fetchCategories () {
      const res = await this.$http.get(`rest/categories`)
      this.categories = res.data
    },
    async fetchItems () {
      const res = await this.$http.get(`rest/goods`)
      this.items = res.data
    },
    async fetchHeroes () {
      const res = await this.$http.get(`rest/heroes`);
      this.heroes = res.data;
    }
  },
  created () {
    this.fetchCategories()
    this.fetchItems()
    this.fetchHeroes();
    this.id && this.fetch()
  },
}
</script>
<style lang="scss">
.hero {
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
.avatar-uploader {
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 5rem;
      height: 5rem;
      line-height: 5rem;
      text-align: center;
    }
    .avatar {
      width: 5rem;
      height: 5rem;
      display: block;
    }
  }
}

.banner-uploader {
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover {
      border-color: #409eff;
    }
    .banner-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 15rem;
      height: 10rem;
      line-height: 10rem;
      text-align: center;
    }
    .banner {
      width: 15rem;
      height: 10rem;
      display: block;
    }
  }
}
</style>