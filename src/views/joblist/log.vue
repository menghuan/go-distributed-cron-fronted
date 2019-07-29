<template>
  <div class="app-container">
    <el-row type="flex" justify="end">
      <el-col :span="2">
        <el-button type="info" @click="refresh">刷新</el-button>
      </el-col>
    </el-row>
    <br>
    <el-table
            v-loading="logsLoading"
            :data="logs"
            element-loading-text="Loading"
            border
            fit
            highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="任务名称" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.JobName }}
        </template>
      </el-table-column>
      <el-table-column label="shell命令" width="130" align="center">
        <template slot-scope="scope">
          {{ scope.row.Command }}
        </template>
      </el-table-column>
      <el-table-column label="错误原因" width="95" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.Err }}</span>
        </template>
      </el-table-column>
      <el-table-column label="脚本输出" width="95" align="center">
        <template slot-scope="scope">
          {{ scope.row.Output }}
        </template>
      </el-table-column>
      <el-table-column label="计划开始时间" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.PlanTime | formatTime }}
        </template>
      </el-table-column>
      <el-table-column label="实际调度时间" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.ScheduleTime | formatTime }}
        </template>
      </el-table-column>
      <el-table-column label="开始执行时间" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.StartTime | formatTime }}
        </template>
      </el-table-column>
      <el-table-column label="执行结束时间" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.EndTime | formatTime }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import jobService from '../../api/job'

export default {
  data() {
    return {
      logs: [],
      logsTotal: 0,
      searchParams: {
        page_size: 200,
        page: 1,
        name: ''
      }
    }
  },
  created() {
    if (this.$route.query.name) {
      this.searchParams.name = this.$route.query.name
    }
    // vue创建成功的时候请求数据
    this.fetchData()
  },
  methods: {
    // 获取任务列表数据
    fetchData(callback = null) {
      jobService.log(this.searchParams, (logs) => {
        this.logs = logs.data
        if (callback) {
          callback()
        }
      })
    },
    // 刷新列表
    refresh() {
      this.fetchData(() => {
        this.$message.success('刷新日志成功')
      })
    }
  }
}
</script>
