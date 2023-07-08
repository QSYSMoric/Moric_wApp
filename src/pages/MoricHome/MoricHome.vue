<template>
    <div class="MoricHome">
        <router-view></router-view>
    </div>
</template>
<script>
import { reactive, ref } from 'vue'
import MessageController from '@/controllers/messageController';
export default {
    setup(){
        let homeMsg = reactive({
            name:"聊天室",
            msg:{
                name:"MoricLogin",
                path:"/"
            },
        });
        let value = ref("");
        let msg = reactive({
            data:["a","b","c"]
        });
        return{
            msg,
            value,
            msg,
            homeMsg
        }
    },
    beforeRouteEnter(){
        //数据请求初始化
        MessageController.start();
    }
}
</script>

<style>
    .MoricHome{
        width: 100%;
        /* height: 100%; */
        padding: 15pt 0px 30pt 0px;
    }
    *{
        font-family: 'IOS','icomoon';
    }
</style>