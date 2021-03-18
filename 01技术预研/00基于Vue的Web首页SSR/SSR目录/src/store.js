import Vue from 'vue'
import Vuex from 'vuex'
import testModule from './modules/testModule'

Vue.use(Vuex)

export function createStore() {
  return new Vuex.Store({
    modules: {
      testModule: testModule,
    },
  })
}
