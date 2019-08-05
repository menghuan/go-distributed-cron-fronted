<template>
  <div class="app-container">
    <el-row type="flex" justify="end">
      <el-col :span="2">
        <el-button type="info" @click="refresh">刷新</el-button>
      </el-col>
    </el-row>
    <br>
    <!--<el-pagination-->
            <!--background-->
            <!--layout="prev, pager, next, sizes, total"-->
            <!--:total="taskTotal"-->
            <!--:page-size="20"-->
            <!--@size-change="changePageSize"-->
            <!--@current-change="changePage"-->
            <!--@prev-click="changePage"-->
            <!--@next-click="changePage">-->
    <!--</el-pagination>-->
    <el-table
      v-loading="jobsLoading"
      :data="jobslist"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <!--<el-table-column align="center" label="ID" width="95">-->
        <!--<template slot-scope="scope">-->
          <!--{{ scope.$index }}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column label="任务名称" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="shell命令" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.command }}</span>
        </template>
      </el-table-column>
      <el-table-column label="cron表达式" width="240" align="center">
        <template slot-scope="scope">
          {{ scope.row.cronExpr }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="任务操作" width="500" align="center">
        <template slot-scope="scope">
          <el-row>
            <el-button type="primary" @click="editJob(scope.row.name)">编辑</el-button>
            <el-button type="danger" @click="deleteJob(scope.row.name)">删除</el-button>
          </el-row>
          <br>
          <el-row>
            <el-button type="success" @click="runJob(scope.row.name)">手动执行</el-button>
            <el-button type="danger" @click="killJob(scope.row.name)">强杀</el-button>
            <el-button type="info" @click="jumpToLog(scope.row.name)">查看日志</el-button>
          </el-row>
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
      jobslist: [],
      jobsTotal: 0,
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
    // 修改状态
    changeStatus(item) {
      if (item.status) {
        jobService.enable(item.id)
      } else {
        jobService.disable(item.id)
      }
    },
    // 切换分页
    changePage(page) {
      this.searchParams.page = page
      this.fetchData()
    },
    // 切换每页数量
    changePageSize(pageSize) {
      this.searchParams.page_size = pageSize
      this.fetchData()
    },
    // 获取任务列表数据
    fetchData(callback = null) {
      // this.jobs = '{"errno":0,"msg":"success","data":[{"name":"job2","command":"echo hello2","cronExpr":"*/5  * * * * * *"},{"name":"job3","command":"echo hello3","cronExpr":"*/5  * * * * * *"},{"name":"job4","command":"echo hello4","cronExpr":"*/5  * * * * * *"},{"name":"job5","command":"echo hello5","cronExpr":"*/5  * * * * * *"},{"name":"job6","command":"echo hello6","cronExpr":"*/5  * * * * * *"},{"name":"job7","command":"echo hello7","cronExpr":"*/2  * * * * * *"},{"name":"job8","command":"echo hello8","cronExpr":"*/2  * * * * * *"}]}'
      jobService.list(this.searchParams, (jobs) => {
        this.jobslist = jobs
        if (callback) {
          callback()
        }
      })
    },
    // 删除任务
    deleteJob(item) {
      this.$appConfirm(() => {
        jobService.delete(item, () => {
          this.refresh()
        })
      })
    },
    // 强杀任务
    killJob(item) {
      this.$appConfirm(() => {
        jobService.kill(item, () => {
          this.refresh()
        })
      })
    },
    // 运行任务
    runJob(item) {
      this.$appConfirm(() => {
        jobService.run(item, () => {
          this.$message.success('任务已开始执行')
        })
      }, true)
    },
    // 跳转任务日志
    jumpToLog(item) {
      this.$router.push(`/jobmanage/log?name=${item}`)
    },
    // 刷新列表
    refresh() {
      this.fetchData(() => {
        this.$message.success('刷新任务成功')
      })
    },
    // 修改任务
    editJob(item) {
      let path = ''
      if (item === null) {
        path = '/jobmanage/add'
      } else {
        path = `/jobmanage/add?name=${item}`
      }
      this.$router.push(path)
    }
  }
}
</script>
