import Vue from 'vue'
import App from './App'
import { myRequest } from './util/api.js'
import { user } from './util/user.js'


Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.$myRequest = myRequest
Vue.prototype.$user = user

const app = new Vue({
    ...App
})
app.$mount()
