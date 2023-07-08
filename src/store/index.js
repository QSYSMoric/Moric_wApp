import {defineStore} from 'pinia';
import { useChatRecordCounterStore } from '@/controllers/chatObjController';
import messageController from '@/controllers/messageController';

//实例化聊天记录仓库
const chatRecordMessageList = useChatRecordCounterStore();

export const useCounterStore = defineStore('counter',{
    //数据保存
    state(){
        return{
            //个人数据
            self:JSON.parse(sessionStorage.getItem('self')),
            //用户列表数据结构
            /* {
                username: '测试用户1', 
                user_id: 10001, 
                avatar_type: 'jpg', 
                lastMsg: '在线', 
                timing: '09:05'
            } */
            userLists:new Map(),
        }
    },
    //返回在线用户数据列表
    getters: {
        userListArray() {
          return Array.from(this.userLists.values());
        }
    },
    actions:{
        //更新用户在线列表
        updatedUserList(array){
            //创建指定用户聊天历史池并且获取初始化的聊天记录
            array.forEach((key)=>{
                chatRecordMessageList.createChatList(key.user_id);
                this.userLists.set(key.user_id,key);
                //获取列表
                messageController.getPrivateChatList(String(this.self.user_id),String(key.user_id));  
            });
        },
        //新增一个便为他创建一个聊天缓存
        addUserList(user){
            if(!user){
                return false;
            }
            this.userLists.set(user.user_id,user);
            //为新用户创建一个聊天缓存
            chatRecordMessageList.createChatList(user.user_id);
            //为获取与新用户的聊天记录
            messageController.getPrivateChatList(String(this.self.user_id),String(user.user_id));  
        },
        getUserMessage(user_id){
            if(!this.userLists.has(user_id)){
                return false;
            }
            return this.userLists.get(user_id);
        },
        getUserListArray(){
            return Array.from(this.userLists.values());
        },
        clearUserList(){
            this.userLists.clear();
        },
        deleteUser(user_id){
            //用户退出那么清除聊天缓存池
            chatRecordMessageList.clearChatRecordByuser(user_id);
            this.userLists.delete(user_id);
        }
    }
});