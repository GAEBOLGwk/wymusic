import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/index.css'
// import axios from 'axios'
// Vue.prototype.$axios = axios
// axios.defaults.baseURL = '/api'

Vue.use(ElementUI);
Vue.config.productionTip = false

// Vue.prototype.$axios = axios

// 注册全局日期过滤器
Vue.filter('dateFormat', function (originVal) {
	const dt = new Date(originVal)
	const year = dt.getFullYear()
	const month = (dt.getMonth() + 1 + '').padStart(2, '0')
	const date = (dt.getDate() + '').padStart(2, '0')
	const hour = (dt.getHours() + '').padStart(2, '0')
	const minute = (dt.getMinutes() + '').padStart(2, '0')
	const seconds = (dt.getSeconds() + '').padStart(2, '0')

	return `${year}-${month}-${date} ${hour}:${minute}:${seconds}`
})


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
