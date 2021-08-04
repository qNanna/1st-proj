import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {}
  },
  mutations: {
    replaceState(state, obj) {
      state.user = obj
      window.localStorage.setItem('user', JSON.stringify(obj))
      //window.sessionStorage.setItem('user', JSON.stringify(obj))
    },
  },
  actions: {

  }
})
