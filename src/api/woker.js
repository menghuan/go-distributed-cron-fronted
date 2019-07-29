import httpClient from '../utils/httpClient'

export default {
  // 节点列表
  list(query, callback) {
    httpClient.get('/worker/list', query, callback)
  },
  // 节点健康
  ping(id, callback) {
    httpClient.get(`/worker/ping/${id}`, {}, callback)
  }
}
