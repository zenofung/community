import Vue from 'vue'
import App from './App'

import { myRequest,fileRequest } from './util/api.js'
import { user } from './util/user.js'
import store from './util/store/index.js'
import './styles/index.scss'

Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.$myRequest = myRequest 
Vue.prototype.$fileRequest = fileRequest 
Vue.prototype.$user = user

const app = new Vue({
    ...App,
	store,
})
app.$mount()

