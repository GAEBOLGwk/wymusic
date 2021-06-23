import axios from 'axios'

const instance = axios.create({
    timeout:5000
});
instance.interceptors.request.use(
    function(config){
        let token = localStorage.getItem('token');
        token && (config.headers.Authorization = token);
        // console.log("全局请求拦截");
        return config;
    },
    function(err){
        return Promise.reject(err);
    }
);
instance.interceptors.response.use(
    function(response){
        // console.log("全局响应拦截");
        return response
    }
)

export function get(url,params){
    return instance.get(url,{
        params
    });
}

export function post(url,data){
    return instance.post(url,{
        data
    });
}

// import axios from 'axios'

// // 设置请求的根路径
// axios.defaults.baseURL = 'https://autumnfish.cn/'

// // 设置请求拦截器和响应拦截器
// axios.interceptors.request.use(config => {
// 	// 展示进度条
// 	NProgress.start()
// 	// 在最后必须return config
// 	return config
// })
// // 在响应拦截器中隐藏进度条
// axios.interceptors.response.use(response => {
// 	// 隐藏进度条
// 	NProgress.done()
// 	// 在最后必须return response
// 	return response
// })

// // 将导入的 axios，挂载到Vue的原型对象上，这样所有 vue 的实例都可以使用
// Vue.prototype.$http = axios