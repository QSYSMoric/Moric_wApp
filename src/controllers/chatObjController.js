import {defineStore} from 'pinia'
import PubSub from 'pubsub-js';


export const useChatRecordCounterStore = defineStore("chatRecord",{
    //数据保存
    state(){
        return{
            //to_userId,dataList
            //用户聊天记录实例
            /* {
                user_id,
                userChatList:[]
            } */
            chatRecord:new Map(),
            user_id:null,
        }
    },
    getters:{
        // 存储消息结构
        /* const sendUser = {
            user_id:chatUser.fromId,         //用户id
            userName:chatUser.fromnName,     //用户名字
            avatar_type:chatUser.avatar_type,//头像格式
            timeing,                         //发送时间
            self:true,                       //是否为本人消息
            messageData:sendValue.data       //数据体
        } */
        lastMsg(state){
            return (user_id)=>{
                //如果没有指定用户缓存那么添加一个
                if (!this.chatRecord.has(user_id)) {
                    return "没有该用户";
                }
                if(!state.chatRecord.get(user_id).length){
                   return "暂时没有消息";
                }
                return state.chatRecord.get(user_id)[length].messageData;
            }
        },
        getChatRecordList(state){
            return (user_id)=>{
                if (!this.chatRecord.has(Number(user_id))) {
                    this.createChatList(Number(user_id));
                    console.log("创建");
                }
                return state.chatRecord.get(Number(user_id));
            }
        },
        //返回聊天数
        getChatRecordSize(state){
            return (user_id)=>{
                // if (!this.chatRecord.has(Number(user_id))) {
                //     this.createChatList(Number(user_id));
                // }
                return state.chatRecord.get(Number(user_id)).length;
            }
        }, 
    },
    actions:{
        //动态生成聊天缓存
        createChatList(to_userId){
            //检查自身的id是否有
            if(!this.user_id){
                this.getSelfId();
            }
            //首先检查缓存池里面是否已经有了聊天缓存库
            if(this.chatRecord.has(to_userId)){
                return;
            }
            this.chatRecord.set(to_userId,new Array());
        },
        // 添加聊天记录到指定用户的缓存
        addChatRecord(to_userId, record) {
            //检查自身的id是否有
            if(!this.user_id){
                this.getSelfId();
            }
            //如果没有指定用户缓存那么添加一个
            if (!this.chatRecord.has(to_userId)) {
                console.log("没有列表重新创建后需要重新绑定");
                this.createChatList(to_userId);
            }
            const chatRecordList = this.chatRecord.get(to_userId);
            if (Array.isArray(record)) {
                let i = 0; // 数据索引
                const intervalId = setInterval(() => {
                    if (i < record.length) {
                        let node = record[i];
                        PubSub.publish(`${to_userId}`,{
                            messageData:node.messageData,
                            timeing:node.timeing
                        });
                        if(this.user_id == node.user_id){
                            console.log("执行");
                            node.self = true;
                        }else{
                            node.self = false;
                        }
                        i++; // 增加索引
                        chatRecordList.push(node);
                    } else {
                      clearInterval(intervalId); // 插入完所有数据后清除定时器
                    }
                }, 100);
                // chatRecordList.push(...record); // 使用扩展运算符将数组元素逐个插入
            } else {
                chatRecordList.push(record); // 如果传进来的数据是一个单个元素，直接插入
                PubSub.publish(`${to_userId}`,{
                    messageData:record.messageData,
                    timeing:record.timeing
                });
            }
        },
        // 根据用户ID获取最后一条聊天记录
        getChatRecordLastMessage(to_userId) {
            if (!this.chatRecord.has(to_userId)) {
                this.createChatList(to_userId);
            }
            let arr = this.chatRecord.get(to_userId);
            if(arr.length){
                return arr[arr.length -1 ];
            }
            return null;
        },
        // 清除指定用户的聊天记录缓存
        clearChatRecordByuser(to_userId) {
            if (this.chatRecord.has(to_userId)) {
                this.chatRecord.delete(to_userId);
            }
        },
        //清除所有聊天记录
        clearChatRecord(){
            this.chatRecord.clear();
        },
        //获取自身的id
        getSelfId(){
            this.user_id = JSON.parse(sessionStorage.getItem('self')).user_id;
        }
    }
});