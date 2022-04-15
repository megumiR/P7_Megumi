import axios from 'axios'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.prototype.$localhost = 'http://localhost:8080/';
Vue.prototype.$axios = axios;
Vue.prototype.$requestBaseURL = 'http://localhost:3000/api/';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

