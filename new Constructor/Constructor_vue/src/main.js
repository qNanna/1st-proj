import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuetify from 'vuetify'
//import vSelect from 'vue-select'
//import qs from 'qs';

Vue.use(VueAxios, axios) 
Vue.use(Vuetify)
//Vue.component('v-select', vSelect)
//Vue.use(qs)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
