<template>
    <div class="MoricUserListItem" 
        @touchstart.stop.passive="toggleClass" 
        @touchend.stop.passive="toggleClass"
        @click.stop="jump"
        :class="active">
        <div class="avatar">
            
        </div>
        <div class="establishChat">
            <div class="establishChat_left">
                <div class="userName">
                    {{user.username}}
                </div>
                <div class="msgData">
                    {{user.lastMsg}}
                </div>
            </div>
            <div class="establishChat_right">
                <div class="msgDeta">
                    {{user.timing}}
                </div>
                <div class="unread">
                    <i class="unreadData" v-if="unread">
                        {{ unread }}
                    </i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router';
import { useChatRecordCounterStore } from '@/controllers/chatObjController';
import PubSub from 'pubsub-js';
import { useGroupChatRecordStore } from '@/controllers/groupChatController'

export default {
    setup(){
        //聊天记录
        const ChatRecordList = useChatRecordCounterStore();
        let active = ref({
            "active":false
        });
        //群聊信息
        const group = useGroupChatRecordStore();
        let user = reactive(group.getGroup(90000));
        let unread = ref(0);
        //触摸事件
        function toggleClass(){
            active.value = true;
        }
        //跳转到聊天界面
        const router = useRouter();
        function jump(){
            router.push({
                name:'MoricChatInterface',
                query:{
                    chat_name:user.username,
                    chat_id:user.user_id
                }
            });
        };
        //创建聊天历史仓库
        //跳转到这个页面时候主动获取最后一条消息
        Promise.resolve(ChatRecordList.createChatList(user.user_id)).then(()=>{
            const arr = ChatRecordList.getChatRecordLastMessage(user.user_id);
            if(arr){
                user.lastMsg = arr.messageData;
                user.timing = arr.timeing;
            }
        });
        //未读消息，被动接收消息
        PubSub.subscribe(`${user.user_id}`,( _ , updatedMsg)=>{
            //未读消息+1
            unread.value ++;
            //更新最后一条消息
            user.lastMsg = updatedMsg.messageData;
            //更新最后更新的时间
            user.timing = updatedMsg.timeing;
        });
        //已读，未读消息清零
        PubSub.subscribe(`${user.user_id}readed`,()=>{
            unread.value = 0;
        });

        return{
            unread,
            user,
            active,
            toggleClass,
            jump
        }
    },
}
</script>

<style scoped>
    .MoricUserListItem{
        width: 100%;
        /* height: 40pt; */
        padding: 12px 24px;
        display: grid;
        grid-template-columns: 40pt 1fr;
        grid-template-rows: 1fr;
        cursor: pointer;
        position: relative;
        border-bottom: solid 1px #e7e6eb;
        /* box-shadow: 0 2px 1px #e7e6eb; */
    }
    .MoricUserListItem::after{
        content: "";
        position: absolute;
        top: 10px;
        left: 5px;
        font-size: 12pt;
    }
    .MoricUserListItem:active{
        background: #f0eff2;
    }
    .active{
        background: #f0eff2;
    }
    @media(min-width: 600pt){
        .MoricUserListItem:hover{
            background: #f0eff2;
        }
        .MoricUserListItem:active{
            background:none;
        }
    }
    .avatar{
        width: 40pt;
        height: 40pt;
        border-radius: 50%;
        overflow: hidden;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 21pt;
        color: #ffffff;
        background: #167efd;
    }
    .avatarImage{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
    }
    .establishChat{
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 1fr 30pt;
        /* margin-left: 10pt; */
    }
    .establishChat_left{
        display: flex;
        padding: 0 0 0 10px;
        flex-direction: column;
        justify-content: center;
        overflow: hidden;
    }
    .establishChat_left div{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .userName{
        font-size: 16pt;
    }
    .establishChat_right{
        text-align: right;
        display: grid;
    }
    .msgData{
        margin-top: 2px;
        font-size: 10pt;
        font-weight: 400;
        color: #8f8e93;
    }
    .msgDeta{
        font-size: 10pt;
        width: 100%;
        height: 100%;
    }
    .unread{
        font-size: 10pt;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    .unreadData{
        font-style: normal;
        width: 12pt;
        height: 12pt;
        display: flex;
        font-size: 8pt;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        padding: 5px;
        background: #fc3d39;
        color: #ffffff;
    }
    .loading{
        background: linear-gradient(110deg,
        rgba(255,255,255, 0) 40%,
        rgba(255,255,255,.5) 50%,
        rgba(255,255,255,0) 60%) #d9d9d9;
        background-size: 200% 100%;
        background-position-x: 120%;
        overflow: hidden;
        animation: 1s loading ease-in-out infinite;
    }
    @keyframes loading{
        to{
            background-position-x: -20%;
        }
    }
</style>