import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import { BootstrapVue } from 'bootstrap-vue'
import './styles/main.scss'
import "./filters/filters.js"
import './registerServiceWorker'
require('./plugins/fontawesome')


Vue.config.productionTip = false
Vue.use(BootstrapVue)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
