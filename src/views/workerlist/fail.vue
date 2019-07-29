<template>
  <div class="app-container">
    <el-row type="flex" justify="end">
      <el-col :span="2">
        <el-button type="info" @click="refresh">刷新</el-button>
      </el-col>
    </el-row>
    <br>
    <el-table
            v-loading="listLoading"
            :data="workers"
            element-loading-text="Loading"
            border
            fit
            highlight-current-row
    >
      <el-table-column align="center" label="ID" width="250">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="节点名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import workService from '../../api/woker'

export default {
  data() {
    return {
      workers: [],
      workersTotal: 0,
      searchParams: {
        page_size: 200,
        page: 1
      }
    }
  },
  created() {
    // vue创建成功的时候请求数据
    this.fetchData()
  },
  methods: {
    // 获取任务列表数据
    fetchData(callback = null) {
      workService.list(this.searchParams, (workers) => {
        this.workers = workers.data
        if (callback) {
          callback()
        }
      })
    },
    // 刷新列表
    refresh() {
      this.fetchData(() => {
        this.$message.success('刷新成功')
      })
    }
  }
}
</script>
