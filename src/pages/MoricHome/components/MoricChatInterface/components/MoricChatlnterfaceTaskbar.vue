<template>
  <div class="MoricChatlnterfaceTaskbar" @keyup.enter.stop="sendMessageFun">
    <div class="inputIcon">
        
    </div>
    <div class="inputTest">
        <input type="text" title="inputMessage" v-model="sendValue.data">
    </div>
    <div class="inputButton">
        <div class="button" @click.stop="sendMessageFun">
            发送
        </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';
import getCurrentDateTime from '@/plugins/getCurrentDateTime';
import { useChatRecordCounterStore } from '@/controllers/chatObjController';
import MessageController from '@/controllers/messageController';
export default {
    name:"MoricChatlnterfaceTaskbar",
    props:["chatUser"],
    setup(props){
        //初始化
        //消息列表
        let chatRecordList = useChatRecordCounterStore();
        const sendValue = reactive({
            data:"",
        });
        const { nowDay } = getCurrentDateTime
        const { chatUser } = props

        function sendMessageFun(){
            if(!sendValue.data){
                alert("不可为空");
                return
            }
            let timeing = nowDay.getHoursMinutesSeconds();//获取当前时间
            //构建用户信息
            const sendUser = {
                user_id:chatUser.fromId,         //来自本人id
                userName:chatUser.fromnName,     //来自本人名字
                avatar_type:chatUser.avatar_type,//头像格式
                timeing,                         //发送时间
                self:true,                       //是否为本人消息
                messageData:sendValue.data       //数据体
            }
            //向本地的聊天记录添加消息：来自谁，信息
            chatRecordList.addChatRecord(Number(chatUser.toId),sendUser);
            //发布消息
            MessageController.sendMessage(Number(chatUser.toId),sendUser);
            sendValue.data = "";
        }
        return{
            sendValue,
            sendMessageFun
        }
    }
}
</script>

<style scoped>
    input[type="text"],
    input[type="password"]{
        font-family: 'icomoon','ios';
        text-indent: 5px;
        border: none;
        font-size: 18pt;
        width: 90%;
        height: 100%;
        border-radius: 5px;
        background-color: #ffff;
    }
    .MoricChatlnterfaceTaskbar{
        width: 100%;
        min-height: 40pt;
        position:fixed;
        display: grid;
        grid-template-columns: 30pt 1fr 80pt;
        gap: 5px;
        padding: 0 10px;
        bottom: 0;
        z-index: 10;
        background: #f0eff4;
    }
    @media(min-width: 600pt){
      .MoricChatlnterfaceTaskbar{
          width: 64%;
          left: 18%;
      }
    }
    .inputIcon{
        width: 100%;
        height: 40pt;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-size: 20pt;
    }
    .inputTest{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .inputTest input{
        outline: none;
        border: none;
        width: 100%;
        height: 30pt;
        font-size: 16pt;
    }
    .inputButton{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .inputButton button{
        outline: none;
    }
    .button{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 90%;
        height: 30pt;
        font-style: normal;
        text-decoration: none;
        background: #052630;
        color: #f2efe5; 
        font-size: 17pt;
        border-radius: 12px;
        cursor:pointer;
    }
    .button:active{
        background: #ffff;
        color: #052630;
    }
</style>