import httpClient from '../utils/httpClient'

export default {
  // 任务列表
  list(query, callback) {
    httpClient.batchGet([
      {
        uri: '/task',
        params: query
      },
      {
        uri: '/host/all'
      }
    ], callback)
  },

  detail(id, callback) {
    httpClient.batchGet([
      {
        uri: `/task/${id}`
      },
      {
        uri: '/host/all'
      }
    ], callback)
  },

  save(data, callback) {
    httpClient.post('/job/save', data, callback)
  },

  remove(id, callback) {
    httpClient.post(`/task/remove/${id}`, {}, callback)
  },

  enable(id, callback) {
    httpClient.post(`/task/enable/${id}`, {}, callback)
  },

  disable(id, callback) {
    httpClient.post(`/task/disable/${id}`, {}, callback)
  },

  run(id, callback) {
    httpClient.post(`/task/run/${id}`, {}, callback)
  }
}
