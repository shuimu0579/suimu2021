import Vue from 'vue'
import Vuex from 'vuex'
import { fetchItem } from './api/api.js'

Vue.use(Vuex)

// 假定我们有一个可以返回 Promise 的
// 通用 API（请忽略此 API 具体实现细节）
// import { fetchItem } from './api'

export function createStore() {
  return new Vuex.Store({
    state: {
      item: {},
    },
    actions: {
      fetchItem({ commit }, id) {
        return fetchItem(id).then(item => {
          commit('setItem', item)
        })
      },
    },
    mutations: {
      setItem(state, item) {
        Vue.set(state.item, item)
      },
    },
  })
}
