<template>
  <div class="ChatlinterFaceNav">
    <div class="topLeft">
        <a @click.stop="goTo" class="black">
            <div 
            class="blackIcon"
            :class="active"
            @touchstart.stop.passive="toggleClass" 
            @touchend.stop.passive="toggleClass"></div>
        </a>
        <div class="stateMsg">
            {{chatMessage.name}}
        </div>
    </div>
    <div class="chatLogo">
        <div class="chatIcon" :class="{active:chatLogo.flag}" @click.stop="switchStyle1">
            
        </div>
        <div class="chatIcon" :class="{active:!chatLogo.flag}" @click.stop="switchStyle2">
            
        </div>
    </div>
  </div>    
</template>

<script>
import { reactive,ref } from 'vue'
import { useRouter } from 'vue-router';
export default {
    name:"MoricChatlnterfaceNav",
    props:["chatName"],
    setup(props){
        //样式相关
        const router = useRouter();
        function goTo(){
            router.replace({
                name:"MoricMsg"
            });
        }
        let chatLogo = reactive({
            flag:true,
        });
        let active = ref({
            "active":false
        });
        function switchStyle1(){
            chatLogo.flag = true;
        }
        function switchStyle2(){
            chatLogo.flag = false;
        }
        function toggleClass(){
            active.value = true;
        }
        //数据初始化
        const chatMessage = reactive({
            name:props.chatName
        })
        return {
            chatLogo,
            active,
            chatMessage,
            goTo,
            switchStyle1,
            switchStyle2,
            toggleClass
        }
    }
}
</script>

<style scoped>
    .ChatlinterFaceNav{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        padding: 15px 16px 10px 16px;
        width: 100%;
        height: 45pt;
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 10;
        background: #ffffff;
    }
    @media(min-width: 600pt){
        .ChatlinterFaceNav{
            position: fixed;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            right: 0;
            padding: 0 24px;
            width: 70%;
            height: 30pt;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #ffffff;
        }
    }
    .topLeft{
        min-width: 40%;
        height: 100%;
        display: grid;
        grid-template-columns: max-content max-content;
        align-items: center;
        gap: 5px;
        cursor: hand;
    }
    .black{
        cursor:pointer;
    }
    .blackIcon{
        font-weight: 600;
        font-size: 20pt;
    }
    @media(min-width:600pt){
        .blackIcon:hover{
            color: #167efd;
        }
    }
    .stateMsg{
        font-weight: 400;
        font-size: 15pt;
    }
    .chatLogo{
        min-width: max-content;
        height: 100%;
        display: flex;
        align-items: center;
    }
    .chatIcon{
        width: 30pt;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18pt;
    }
    .active{
        color: #167efd;
        border-bottom: 2px solid #167efd;
    }
</style>