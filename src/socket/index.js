import io from 'socket.io-client';
import pubsub from "pubsub-js";
import tokenWatcher from '@/plugins/tokenWatcher';

//创建连接
const socket = io(process.env.VUE_APP_API_URL);

socket.on('connect',()=>{
    console.log("连接到服务器");
});

//断开连接
pubsub.subscribe("scoketDisconnect",()=>{
    console.log("退出");
    //取消所有订阅
    socket.off();
    // 断开与服务端的连接
    socket.disconnect();
});

//服务器反映token过期
socket.on("handleExpiredToken",()=>{
    // 断开与服务端的连接
    socket.disconnect();
    //跳转到首页
    tokenWatcher.handleTokenExpiration();
});

export default socket;