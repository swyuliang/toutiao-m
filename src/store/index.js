import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)
// 引入小仓库

const TOKEN_KEY = 'TOUTIAO_USER'

export default new Vuex.Store({
  state: {
    // 一个对象，存储当前登录用户信息（token等数据）
    user: getItem(TOKEN_KEY)
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // 为了防止刷新丢失，我们需要把数据备份到本地存储
      setItem(TOKEN_KEY, state.user)
      // window.localStorage.setItem(TOKEN_KEY, JSON.stringify(state.data)
    }
  },
  actions: {},
  getters: {},
  // 实现Vuex仓库模块式开发存储数据
  modules: {}
})
