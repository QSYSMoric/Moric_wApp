import {defineStore} from 'pinia'
import { useChatRecordCounterStore } from '@/controllers/chatObjController';
import axios from '@/plugins/axiosInstance';

//实例化聊天记录仓库
const chatRecordMessageList = useChatRecordCounterStore();
export const useGroupChatRecordStore = defineStore('groupChat',{
    state(){
        return {
            //频道聊天缓存池
            //群聊信息聊天结构
            /*{
                user_id:90000,
                username:"公共频道",
                lastMsg:"欢迎",
                timing:"22:09",
                unreadMessage:0
            };*/
            groupList:new Map(),
            //群聊仓库的聊天结构
            // 存储消息结构
            /* const sendUser = {
                user_id:chatUser.fromId,         //来自本人id
                userName:chatUser.fromnName,     //来自本人名字
                avatar_type:chatUser.avatar_type,//头像格式
                timeing,                         //发送时间
                self:true,                       //是否为本人消息
                messageData:sendValue.data       //数据体
            } */
            groupChatRecords:new Map()
        }
    },
    getters:{
        groupChatListArray() {
            return Array.from(this.groupList.values());
        }
    },
    actions:{
        updatedGroupList(array){
            //创建指定用户聊天历史池并且获取初始化的聊天记录
            array.forEach((key)=>{
                chatRecordMessageList.createChatList(key.user_id);
                this.groupList.set(key.user_id,key);
                Promise.resolve(axios({
                    url:`/moric/getGroupChatHistoryById`,
                    method:'get',
                    params:{
                        room_id:key.user_id
                    }
                }).then((result)=>{
                    chatRecordMessageList.addChatRecord(key.user_id,result.data.body);
                }));
            });
        },
        getGroup(room_id){
            return this.groupList.get(room_id);
        },
    }
})
