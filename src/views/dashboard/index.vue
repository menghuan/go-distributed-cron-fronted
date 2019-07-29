<template>
  <div class="dashboard-container">
    <div class="dashboard-text">{{ name }}</div>
    <div>
        master 任务的管理以及一个后台操作管理<br>
        主程序初始化相关操作<br>
          1. 线程数设置<br>
          2. 命令行参数统一解析<br>
          2. 配置文件处理<br>
          3. 任务事件管理器 任务的列表，保存，删除，杀死等功能实现，任务保存在ETCD中<br>
          4. http服务 路由配置 路由逻辑实现<br>
          5. 返回值统一处理<br>
        worker<br>
        抢占任务 任务调度 执行任务<br>
          1. 从etcd中把任务job同步到内存中<br>
          2. 实现调度模块，基于cron表达式解析并调度job<br>
          3. 实现执行模块，并发的执行多个job<br>
          4. 实现分布式锁，解决并发惊群调度问题<br>
          5. 把执行的日志保存到存储中
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
