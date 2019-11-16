<template>
  <div class="goodslist">
    <bread></bread>
    <div class="fillcontain">
      <div class="search_container search-area">
        <el-form :inline="true"
                 ref="search_data"
                 :model="search_data"
                 class="demo-form-inline search-form">
          <el-form-item>
            <el-input size="mini"
                      placeholder="搜索物品"
                      v-model="search_data.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       size="mini"
                       icon="search"
                       @click='onScreeoutMoney()'>筛选</el-button>
          </el-form-item>

          <el-form-item class="btnRight">
            <el-button type="primary"
                       size="mini"
                       icon="view"
                       @click="$router.push(`/goods/create`)">添加</el-button>
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
          <el-table-column prop="name"
                           label="物品名称"
                           align='center'>
          </el-table-column>
          <el-table-column prop="icon"
                           label="物品图标"
                           align='center'>
            <template slot-scope="scope">
              <img :src="scope.row.icon"
                   style="height:3rem;border-radius:3px;">
            </template>
          </el-table-column>
          <el-table-column fixed="right"
                           label="操作"
                           width="180"
                           align='center'>
            <template slot-scope="scope">
              <el-button type="warning"
                         size="small"
                         @click="$router.push(`/goods/edit/${scope.row._id}`)">编辑</el-button>
              <el-button type="danger"
                         size="small"
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
        name: ''
      }
    }
  },
  methods: {
    async fetch () {
      const res = await this.$http.get('rest/goods')
      this.items = res.data
      this.filterTableData = res.data
      // 设置分页数据
      this.setPaginations();
    },
    async remove (row) {
      this.$confirm(`是否确定要删除物品 "${row.name}"?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`rest/goods/${row._id}`)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        // 删除成功,重新获取分类数据
        this.fetch()
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
      if (!this.search_data.name) {
        this.$message({
          type: "warning",
          message: "请输入要搜索的物品"
        });
        this.fetch();
        return;
      }
      this.items = this.fuzzyQuery(this.filterTableData, this.search_data.name)
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
    fuzzyQuery (list, keyWord) {
      // 模糊查找
      var arr = [];
      for (var i = 0; i < list.length; i++) {
        if (list[i].name.split(keyWord).length > 1) {
          arr.push(list[i]);
        }
      }
      return arr;
    }
  },
  created () {
    // 获取分类列表数据
    this.fetch()
  }
}
</script>

<style lang="scss">
.goodslist {
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