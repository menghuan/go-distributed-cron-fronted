import httpClient from '../utils/httpClient'
import defaultSettings from '@/settings'

export default {
  // 任务列表
  list(query, callback) {
    httpClient.post(defaultSettings.serviceUrl + '/job/list', query, callback)
  },
  // 修改任务
  save(data, callback) {
    httpClient.post(defaultSettings.serviceUrl + '/job/save', { job: JSON.stringify(data) }, callback)
  },
  // 删除任务
  delete(name, callback) {
    httpClient.post(defaultSettings.serviceUrl + `/job/delete`, { name: name }, callback)
  },
  // 强杀任务
  kill(name, callback) {
    httpClient.post(defaultSettings.serviceUrl + `/job/kill`, { name: name }, callback)
  },
  // 状态可用
  enable(name, callback) {
    httpClient.post(defaultSettings.serviceUrl + `/job/enable`, { name: name }, callback)
  },
  // 状态不可用
  disable(name, callback) {
    httpClient.post(defaultSettings.serviceUrl + `/job/disable`, { name: name }, callback)
  },
  // 运行任务
  run(name, callback) {
    httpClient.post(defaultSettings.serviceUrl + `/job/run`, { name: name }, callback)
  },
  // 日志
  log(query, callback) {
    httpClient.get('/job/log', query, callback)
  }
}
