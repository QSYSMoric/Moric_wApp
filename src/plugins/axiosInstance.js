//axiosInstance.js
//导入axios
import axios from 'axios'
import tokenWatcher from './tokenWatcher';
axios.defaults.withCredentials = true;
//使用axios下面的create([config])方法创建axios实例，其中config参数为axios最基本的配置信息。
const API = axios.create({
	baseURL:process.env.VUE_APP_API_URL, //请求后端数据的基本地址，自定义
});
console.log(window.gApiUrl);
API.interceptors.request.use((config)=>{
	const token = tokenWatcher.getToken();
	if(token){
		config.headers['token'] = token;
	}
	return config;
},(err)=>{
	return Promise.reject(err);
})

//导出我们建立的axios实例模块，ES6 export用法
export default API