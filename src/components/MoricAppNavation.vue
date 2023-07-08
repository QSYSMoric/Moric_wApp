<template>
    <div class="topNavigation">
        <div class="topLeft">
            <a @click.stop="goTo" class="black">
                <div class="blackIcon"></div>
            </a>
            <div class="stateMsg">
                {{name}}
            </div>
        </div>
        <div class="appLogo">
            <div class="appIcon">Moric</div>
        </div>
    </div>
</template>

<script>
import {useRouter} from 'vue-router'
import pubsub from "pubsub-js"
import { useCounterStore } from '@/store/index'
import { useChatRecordCounterStore } from '@/controllers/chatObjController'
export default {
    name:"MoricAppNavation",
    props:["name","msg"],
    setup(props){
        const router = useRouter();
        const chatRecordList = useChatRecordCounterStore();
        //发布消息
        function goTo(){
            //清除所有内容
            const userList = useCounterStore();
            userList.clearUserList();
            userList.$reset();
            chatRecordList.$reset();
            pubsub.publish("clearUserList");
            pubsub.publish("scoketDisconnect");
            router.replace({
                name:props.msg.name,
                path:props.msg.path,
            });
        }
        return {
            goTo
        }
    }
}
</script>

<style>
    *{
        font-family: 'icomoon';
    }
    a{
        text-decoration: none;
        color:#052630;
    }
    .topNavigation{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        padding: 12px 24px 5px 24px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 10;
        background: #ffffff;
    }
    @media(min-width: 1000pt){
        .topNavigation{
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
        gap: 10px;
        cursor: hand;
    }
    .black{
        cursor:pointer;
    }
    .blackIcon{
        font-weight: 600;
        font-size: 17pt;
    }
    .stateMsg{
        font-weight: 400;
        font-size: 15pt;
    }
    .appLogo{
        min-width: max-content;
        height: 100%;
        display: flex;
        align-items: center;
    }
    .appIcon{
        font-family: "Luckiest";
        width: 100%;
        font-size: 22pt;
    }
</style>