<template>
  <MoricChatlnterfaceNav :chatName="chatMessage.toName"></MoricChatlnterfaceNav>
  <div class="MoricChatInterface">
    <MoricChatinterfaceConent :toId="chatMessage.toId"></MoricChatinterfaceConent>
  </div>
  <MoricChatlnterfaceTaskbar :chatUser="chatMessage"></MoricChatlnterfaceTaskbar>
</template>

<script>
import { reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useCounterStore } from '@/store/index';
import PubSub from 'pubsub-js';
import MoricChatlnterfaceNav from './components/MoricChatlnterfaceNav';
import MoricChatinterfaceConent from './components/MoricChatinterfaceConent';
import MoricChatlnterfaceTaskbar from './components/MoricChatlnterfaceTaskbar';
export default {
    name:"MoricChatInterface",
    components:{
      MoricChatlnterfaceNav,
      MoricChatinterfaceConent,
      MoricChatlnterfaceTaskbar
    },
    setup(){
      //连接到所属的会话控制模块
      //初始化获取当前会话，是哪个房间
      const route = useRoute();
      const userStore = useCounterStore();
      const chatMessage = reactive({
        fromnName:userStore.self.username,
        fromId:userStore.self.user_id,
        avatar_type:userStore.self.avatar_type,
        toName:route.query.chat_name,
        toId:route.query.chat_id,
      });
      //进入聊天清除未聊天数量
      PubSub.publish(`${chatMessage.toId}readed`);
      return {
        chatMessage,
      }
    }
}
</script>

<style>
  .MoricChatInterface{
    margin: 0;
    padding: 30pt 0;
  }
</style>
