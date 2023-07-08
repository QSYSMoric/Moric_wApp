<template>
    <div class="MoricChatinterfaceMsgItem" :class="myMessageClass">
        <div class="chatAvater loading">
            <img :src="messageUser.userAvater" v-if="messageUser.userAvater" alt="头像">
            <div v-else class="defaultAvatar">
                
            </div>
        </div>
        <div class="message">
            <div class="userName">
                <p>{{messageUser.userName}}</p>
                <p>{{messageUser.timeing}}</p>
            </div>
            <div class="messageData">
                <div class="messageValue">
                    {{ messageUser.messageData }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive } from 'vue';
import { useimgCounterStore } from '@/store/ImageProcessingModule';
export default {
    name:"MoricChatinterfaceMsgItem",
    props:['userItem'],
    setup(props){
        const imgStore = useimgCounterStore();
        const userNode = props.userItem;
        //区分用户与其他用户样式列表
        const myMessageClass = reactive({
            myMessage:true,
        });
        //消息详尽
        const messageUser = reactive({
            userAvater:"",
            userName:userNode.userName,
            timeing:userNode.timeing,
            messageData:userNode.messageData,
            self:userNode.self
        });
        myMessageClass.myMessage = messageUser.self;
        //请求头像后改变默认头像
        imgStore.requestImage(userNode.user_id,"jpg").then((data)=>{
            messageUser.userAvater = data;
        });

        return{
            myMessageClass,
            messageUser
        }
    }
}
</script>

<style scoped>
    @keyframes move{
        0%{
            transform: translate(50px,50px);
            opacity: .3;
        }
        100%{
            transform: translate(0,0);
            opacity: 1;
        }
    }
    /* 默认为其他人发的消息 */
    .MoricChatinterfaceMsgItem{
        width: 100%;
        display: grid;
        grid-template-columns: 32pt 1fr 32pt;
        column-gap:6px;
        animation-name: move;
        animation-duration: .5s;
        animation-timing-function: ease-out;
    }
    .MoricChatinterfaceMsgItem + .MoricChatinterfaceMsgItem{
        margin-top: 10px;
    }
    .chatAvater{
        width: 32pt;
        height: 32pt;
        overflow: hidden;
        border-radius: 50%;
    }
    .chatAvater img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .defaultAvatar{
        width: 100%;
        height: 100%;
        display: flex;
        border-radius: 50%;
        justify-content: center;
        align-items: center;
        background: #151819;
        color: #f8f9f9;
        font-size: 21pt;
    }
    .message{
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    .userName{
        font-size: 8pt;
        color: #8f8e93;
    }
    .messageData{
        width: 100%;
        display: flex;
    }
    .messageValue{
        font-family: 'Courier New','ios';
        min-width: min-content;
        width: 100%;
        width: fit-content;
        padding: 10px 10px;
        background: #f0eff4;
        white-space: normal;
        line-height: 1.4;
        border-radius: 12px;
        box-shadow: 0 0 10px #f0eff4;
        color: #052630;
        font-size: 12pt;
        font-weight: 500;
    }
    /* 用户自己发的消息 */
    .myMessage{
        grid-template-columns: 1fr 32pt;
        padding-left: 32pt;
    }
    .myMessage .chatAvater{
        order: 2;
    }
    .myMessage .userName{
        text-align: right;
    }
    .myMessage .messageData{
        justify-content: end;
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