import { fetchItem } from '../api/api.js'

// 假定我们有一个可以返回 Promise 的
// 通用 API（请忽略此 API 具体实现细节）
// import { fetchItem } from './api'
const testModule = {
  namespaced: true,
  state: {
    item: {},
  },
  actions: {
    fetchItems(context, id) {
      console.log('id...', id)
      return fetchItem(id).then(item => {
        console.log('item...', item)
        context.commit('setItem', item)
      })
    },
  },
  mutations: {
    setItem(state, item) {
      console.log(' setItem item', item)
      state.item = item
    },
  },
}
export default testModule
