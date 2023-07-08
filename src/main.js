import { createApp } from 'vue'
import App from './App.vue'
import router from './routers';
import "@/assets/fonts/icomoon/style.css"
import jsCookiePlugin from './plugins/js-cookie';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import animateLodingList from './directives/animateLodingList';
// import './socket/index'
const app = createApp(App);   //建立一个vue3app
app.use(router);
app.use(createPinia().use(piniaPluginPersistedstate));

app.config.errorHandler = (err, vm, info) => {
    console.log('errorHandle', err, vm, info);
    // err，错误对象
    // vm，发生错误的组件实例
    // info，Vue特定的错误信息，例如错误发生的生命周期、错误发生的事件
}

app.directive('listLoding', animateLodingList);

// 注册 js-cookie 插件
app.use(jsCookiePlugin);
app.mount('#app');            //将这个vue3app全局挂载到#app元素上