<template>
  <div class="pic-articles-list">
    <bread></bread>
    <div class="fillcontain">
      <div class="search_container search-area">
        <el-form :inline="true"
                 ref="search_data"
                 :model="search_data"
                 class="demo-form-inline search-form">
          <!-- <el-form-item label="文章搜索:">
            <el-input placeholder="搜索文章"
                      v-model="search_data.name">
            </el-input>
          </el-form-item> -->
          <el-form-item label="图文分类搜索:"
                        style="margin-left: 20px">
            <el-select filterable
                       multiple
                       v-model="search_data.categories">
              <el-option v-for="item in categories"
                         :key="item._id"
                         :label="item.name"
                         :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       size="mini"
                       icon="el-icon-search"
                       @click='onScreeoutMoney()'>筛选</el-button>
          </el-form-item>

          <el-form-item class="btnRight">
            <el-button type="primary"
                       size="mini"
                       icon="el-icon-circle-plus-outline"
                       @click="$router.push(`/picArticles/create`)">添加图文</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="table_container">
        <el-table :data="tableData"
                  style="width: 100%"
                  align="center">
          <el-table-column prop="_id"
                           label="ID"
                           width="240"
                           align='center'>
          </el-table-column>
          <el-table-column prop="title"
                           label="图文标题"
                           align='center'>
          </el-table-column>
          <el-table-column prop="categories"
                           label="图文分类"
                           align='center'
                           :formatter="categoryFormat">
          </el-table-column>
          <el-table-column prop="createdAt"
                           label="创建时间"
                           align='center'
                           :formatter="timeFormat">
          </el-table-column>
          <el-table-column fixed="right"
                           label="操作"
                           width="180"
                           align='center'>
            <template slot-scope="scope">
              <el-button type="primary"
                         size="small"
                         icon="el-icon-edit"
                         @click="$router.push(`/picarticles/edit/${scope.row._id}`)">编辑</el-button>
              <el-button type="danger"
                         size="small"
                         icon="el-icon-delete"
                         @click="remove(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row>
          <el-col :span="24">
            <div class="pagination">
              <el-pagination v-if='paginations.total > 0'
                             :page-sizes="paginations.page_sizes"
                             :page-size="paginations.page_size"
                             :layout="paginations.layout"
                             :total="paginations.total"
                             :current-page.sync='paginations.page_index'
                             @current-change='handleCurrentChange'
                             @size-change='handleSizeChange'>
              </el-pagination>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs'
export default {
  data () {
    return {
      items: [],
      //需要给分页组件传的信息
      paginations: {
        page_index: 1,  // 当前位于哪页
        total: 0,        // 总数
        page_size: 20,   // 1页显示多少条
        page_sizes: [5, 10, 15, 20],  //每页显示多少条
        layout: "total, sizes, prev, pager, next, jumper"   // 翻页属性
      },
      tableData: [],
      filterTableData: [],
      search_data: {
        categories: []
      },
      categories: []
    }
  },
  methods: {
    categoryFormat (row) {
      let ret = []
      row.categories.forEach(s => {
        return ret.push(s.name)
      })
      return ret.join('、')
    },
    timeFormat (row) {
      return dayjs(row.createdAt).format('YYYY/MM/DD hh:mm')
    },
    async fetch () {
      const res = await this.$http.get('rest/picarticles')
      this.items = res.data
      this.filterTableData = res.data
      // 设置分页数据
      this.setPaginations();
    },
    async fetchCategory () {
      const res = await this.$http.get(`rest/categories`)
      this.categories = res.data
    },
    async remove (row) {
      this.$confirm(`是否确定要删除图文 "${row.title}"?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`rest/picarticles/${row._id}`)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        // 删除成功
        this.fetch()
        setTimeout(() => {
          this.onBeforeQuery()
        }, 100)
        // this.fetch()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    setPaginations () {
      // 总页数
      this.paginations.total = this.items.length;
      this.paginations.page_index = 1;
      this.paginations.page_size = 5;
      // 设置默认分页数据
      this.tableData = this.items.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    handleCurrentChange (page) {
      // 当前页
      let sortnum = this.paginations.page_size * (page - 1);
      let table = this.items.filter((item, index) => {
        return index >= sortnum;
      });
      // 设置默认分页数据
      this.tableData = table.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    handleSizeChange (page_size) {
      // 切换size
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;
      this.tableData = this.items.filter((item, index) => {
        return index < page_size;
      });
    },
    onScreeoutMoney () {
      // 筛选
      if (this.search_data.categories.length === 0) {
        this.$message({
          type: "warning",
          message: "请输入图文分类名称!"
        });
        this.fetch();
        return;
      }
      this.items = this.fuzzyQuery(this.filterTableData, this.search_data.categories)
      if (this.items) {
        this.$message({
          type: "success",
          message: "查询成功!"
        })
        // 重新查询分页数据
        this.setPaginations();
        return
      }
    },
    onBeforeQuery () {
      // 筛选
      if (this.search_data.categories.length === 0) {
        this.fetch();
        return;
      }
      this.items = this.fuzzyQuery(this.filterTableData, this.search_data.categories)
      // 重新查询分页数据
      this.setPaginations();
      return
    },
    fuzzyQuery (list, categoryId) {
      // 模糊查找
      let arr = [];
      for (let i = 0; i < list.length; i++) {
        //是否被包含
        let ret = []
        list[i].categories.forEach(item => {
          ret.push(item._id)
        })
        let flag = this.isContained(new Array(ret)[0], new Array(categoryId)[0])
        if (flag) {
          arr.push(list[i])
        }
      }
      return arr;
    },
    isContained (a, b) {
      // 判断a是b是数组且a的子集包含b的子集
      if (!(a instanceof Array) || !(b instanceof Array)) return false;
      if (a.length < b.length) return false;
      var aStr = a.toString();
      for (var i = 0, len = b.length; i < len; i++) {
        if (aStr.indexOf(b[i]) == -1) return false;
      }
      return true;
    }
  },
  created () {
    // 获取分类列表数据
    this.fetch()
    // 获取分类
    this.fetchCategory()
  }
}
</script>

<style lang="scss">
.pic-articles-list {
  width: 100%;
  height: 100%;
  font-size: 16px;
  box-sizing: border-box;
  background: #f0f2f5;
  .fillcontain {
    padding: 20px;
    box-sizing: border-box;
    .search-area {
      background: #ffffff;
      border-radius: 2px;
      padding: 18px 18px 0;
      margin-bottom: 20px;
      .search-form {
        width: 100%;
        min-width: 750px;
        .btnRight {
          float: right;
        }
      }
    }
    .table_container {
      padding: 10px;
      background: #fff;
      border-radius: 2px;
      .el-table {
        th {
          color: #409eff;
        }
        .cell {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .pagination {
        text-align: right;
        padding: 10px 18px;
      }
    }
  }
}
</style>