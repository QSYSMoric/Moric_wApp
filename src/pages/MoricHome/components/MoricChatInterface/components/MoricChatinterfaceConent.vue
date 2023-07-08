<template>
  <ul class="ChatinterfaceConent">
    <li v-listLoding v-for="(node,index) in chatMessageTemp" :key="index" ref="child">
        <MoricChatinterfaceMsgItem :userItem="node"></MoricChatinterfaceMsgItem>
    </li>
  </ul>
</template>

<script>
import MoricChatinterfaceMsgItem from './MoricChatinterfaceMsgItem.vue';
import { ref,nextTick,watch } from 'vue';
import { useChatRecordCounterStore } from '@/controllers/chatObjController';
export default {
    name:"MoricChatinterfaceConent",
    components:{
        MoricChatinterfaceMsgItem
    },
    props:['toId'],
    setup(props){
        //聊天列表的dom元素
        const child = ref(null);
        //消息列表
        let chatRecordList = useChatRecordCounterStore();
        //为聊天记录渲染绑定仓库
        let chatMessageTemp = chatRecordList.getChatRecordList(props.toId);
        //监听聊天列表当有新增的消息后将视口滚动到底部
        watch(chatMessageTemp,()=>{
            nextTick(()=>{
                window.scroll({
                    top: document.body.scrollHeight,
                    behavior: 'smooth' // 平滑滚动效果，可选
                });
            });
        },{deep:true});

        return {
            child,
            chatMessageTemp
        }
    }
}
</script>

<style>
    .ChatinterfaceConent{
        width: 100%;
        padding: 10px 24px;
        display: grid;
        grid-auto-rows: max-content;
        gap: 10px;
    }
    /* .ChatinterfaceConent li{
        width: 100%;
        min-height:10pt;
    } */
</style>
