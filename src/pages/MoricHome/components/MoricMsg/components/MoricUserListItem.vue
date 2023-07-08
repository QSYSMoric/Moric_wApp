<template>
    <div class="MoricUserListItem"
        v-listLoding 
        @touchstart.stop.passive="toggleClass" 
        @touchend.stop.passive="toggleClass"
        @click.stop="jump"
        :class="active">
        <div class="avatar loading">
            <img :src="imgNode.data" v-if="imgNode.data" alt="头像" class="avatarImage">
            <div v-else class="defaultAvatar">
                
            </div>
        </div>
        <div class="establishChat">
            <div class="establishChat_left">
                <div class="userName">
                    {{user.name}}
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
                    <i class="unreadData" v-if="user.unreadMessage">
                        {{user.unreadMessage}}
                    </i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router';
import {useimgCounterStore} from "@/store/ImageProcessingModule";
import { useChatRecordCounterStore } from "@/controllers/chatObjController";
export default {
    props:["item"],
    setup(props){
        //聊天记录
        const ChatRecordList = useChatRecordCounterStore();
        let {item} = props;
        const router = useRouter();
        let imgNode = reactive({
            data:null,
        });
        let active = ref({
            "active":false
        })
        const imgStore = useimgCounterStore();
        if(item.user_id){
            imgStore.requestImage(item.user_id,item.avatar_type).then((data)=>{
                imgNode.data = data;
            },(err)=>{
                console.log(err);
            })
        }
        let user = reactive({
            name:null,
            lastMsg:null,
            timing:null,
            unreadMessage:0
        });
        if(item){
            user.name = item.username;
            user.lastMsg = item.lastMsg;
            user.timing = item.timing;
        }
        //触摸事件
        function toggleClass(){
            active.value = true;
        }
        //跳转
        function jump(){
            router.push({
                name:'MoricChatInterface',
                query:{
                    chat_name:user.name,
                    chat_id:item.user_id
                }
            });
        }
        //创建聊天历史仓库
        //跳转到这个页面时候主动获取最后一条消息
        Promise.resolve(ChatRecordList.createChatList(item.user_id)).then(()=>{
            const arr = ChatRecordList.getChatRecordLastMessage(item.user_id);
            if(arr){
                user.lastMsg = arr.messageData;
                user.timing = arr.timeing;
            }
        });
        //未读消息，被动接收消息
        PubSub.subscribe(`${item.user_id}`,( _ , updatedMsg)=>{
            //未读消息+1
            user.unreadMessage ++;
            //更新最后一条消息
            user.lastMsg = updatedMsg.messageData;
            //更新最后更新的时间
            user.timing = updatedMsg.timeing;
        });

        return{
            imgNode,
            user,
            active,
            jump,
            toggleClass
        }
    }
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
    }
    .avatarImage{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
    }
    .defaultAvatar{
        width: 100%;
        height: 100%;
        display: flex;
        border-radius: 50%;
        justify-content: center;
        align-items: center;
        background: #f0eff2;
        color: #151819;
        font-size: 30pt;
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