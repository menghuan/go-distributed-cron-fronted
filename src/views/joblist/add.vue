<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="formRules" label-width="120px">
      <el-form-item label="任务名称">
        <el-input v-model="form.name"  placeholder="任务名称" prop="name"/>
      </el-form-item>
      <el-form-item label="shell命令">
        <el-input v-model="form.command"  placeholder="shell命令"  prop="command"/>
      </el-form-item>
      <el-form-item label="cron表达式">
        <el-input v-model="form.cronExpr" placeholder="秒 分 时 天 月 周（* * * * * *）"  prop="cronExpr"/>
      </el-form-item>
      <el-form-item label="任务备注">
        <el-input
                type="textarea"
                :rows="3"
                size="medium"
                width="100"
                v-model="form.remark">
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">保存</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import jobService from '../../api/job'
export default {
  data() {
    return {
      form: {
        name: '',
        command: '',
        cronExpr: ''
      },
      formRules: {
        name: [
          { required: true, message: '请输入任务名称', trigger: 'blur' },
          { min: 5, max: 30, message: '任务长度在5到30之间', trigger: 'blur' }
        ],
        cronExpr: [
          { required: true, message: '请输入crontab表达式', trigger: 'blur' }
        ],
        command: [
          { required: true, message: '请输入命令', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (!valid) {
          return false
        }
        this.save()
      })
    },
    save() {
      jobService.save(this.form, () => {
        this.$router.push('/jobmanage/index')
        this.$message('提交成功!')
      })
    },
    onCancel() {
      this.$message({
        message: '取消任务!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

