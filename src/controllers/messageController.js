import socket from '@/socket/index';
import validateLogon from '@/plugins/validateLogon';
import axios from '@/plugins/axiosInstance';
import { useCounterStore } from '@/store';
import { useChatRecordCounterStore } from '@/controllers/chatObjController';
import { useGroupChatRecordStore } from "@/controllers/groupChatController"
import PubSub from 'pubsub-js';

//初始化用户信息管理模块
const chatRecordMessageList = useChatRecordCounterStore();

//加入群聊频道
const JoinDefaultChannel = function(room_id){
    socket.emit("JoinDefaultChannel",room_id);
}
//初始化，安装信息收发的管理模块
const start =  function(){
    //初始化用户管理模块
    const userStore = useCounterStore();    
    //初始化群聊频道信息
    const groupChat = useGroupChatRecordStore();
    //呼叫服务器
    socket.connect();
    //初始化获取用户列表(生命周期为一次)
    Promise.resolve(axios({
        url:`/moric/getUserlist`,
        method:'get',
        params:{
            user_id:userStore.self.user_id
        }
    }).then((value)=>{
        userStore.updatedUserList(value.data.body);
    }).catch(err=>{
        alert(err);
        PubSub.publish("handleExpiredToken");
    }));
    //初始化频道列表
    Promise.resolve(groupChat.updatedGroupList([{
        user_id: 90000,
        username: "公共频道",
        lastMsg: "欢迎",
        timing: "22:09",
        unreadMessage: 0
    }]));
    //初始化上传token验证验证身份
    socket.emit("token",validateLogon.getToken());
    //订阅接收新的用户
    socket.on("updateUser", (data) => {
        userStore.addUserList(data);
    });
    //订阅如果有其他用户退出
    socket.on("userExit",(data)=>{
        userStore.deleteUser(data);
    });
    //订阅接收群聊消息接口
    socket.on("publicMessages",(data)=>{
        //广播事件
    });
    //订阅私人聊天消息接口
    socket.on("PrivateChatModule",(room_id,Message)=>{
        Message.self = false;
        chatRecordMessageList.addChatRecord(room_id,Message);
    });
    //订阅接收群聊消息接口
    socket.on("GroupChatModule",(room_id,Message)=>{
        Message.self = false;
        chatRecordMessageList.addChatRecord(room_id,Message);
    });
    //用户自动加入群聊频道
    JoinDefaultChannel(90000);    
};

//发送消息
const sendMessage = function(to_userId,Message){
    //群聊消息id90000开始
    //私人消息id10000开始
    const regex = /^9\d+/;
    if(regex.test(to_userId)){
        //GroupMessageModule
        socket.emit("GroupMessageModule",to_userId,Message);
        return 
    }
    socket.emit("PrivateMessageModule",to_userId,Message);
}

//获取聊天历史记录数据
function getPrivateChatList(fromId,toId){
    Promise.resolve(axios({
        url:`/moric/getPrivateLetterList`,
        method:'get',
        params:{
            fromId,
            toId
        }
    }).then((result)=>{
        chatRecordMessageList.addChatRecord(Number(toId),result.data.body);
    }));
}

export default {
    start,
    JoinDefaultChannel,
    sendMessage,
    getPrivateChatList
}