<template>
    <div class="MoricUserList">
        <MoricAppNavation :name="homeMsg.name" :msg="homeMsg.msg"></MoricAppNavation>
        <div class="bottom">
            <MoricSearchInput/>
            <ul class="content">
                <li>
                    <MoricGroupItem/>
                </li>
                <template v-if="userListArray.length">
                    <li 
                    v-animate
                    v-for="(user,index) in userListArray" 
                    :key="user.user_id" 
                    :index="index">
                        <MoricUserListItem :item="user"/>
                    </li>
                </template>
            </ul>
        </div>
    </div>
</template>

<script>
import MoricAppNavation from '@/components/MoricAppNavation.vue';
import MoricUserListItem from './components/MoricUserListItem.vue';
import MoricSearchInput from './components/MoricSearchInput.vue';
import MoricGroupItem from './components/MoricGroupItem.vue';
import animateDirective from '@/directives/animateDirective'
import { useCounterStore } from '@/store';
import { reactive, computed } from 'vue'
export default {
    name:"MoricUserList",
    components:{
        MoricAppNavation,
        MoricUserListItem,
        MoricSearchInput,
        MoricGroupItem
    },
    setup(){
        //当前页面信息
        let homeMsg = reactive({
            name:"消息",
            msg:{
                name:"MoricLogin",
                path:"/"
            },
            mySelfLoaded:false,
        });
        //获取用户列表
        //初始化用户信息管理模块
        const userStore = useCounterStore();
        const userListArray = computed(() => userStore.userListArray);

        return{
            homeMsg,
            userListArray
        }
    },
    directives: {
        // 在模板中启用 v-focus
        animate: animateDirective
    }
}
</script>

<style>
    .bottom{
        padding: 30pt 0;
    }
    .content{
        width: 100%;
        margin-top: 20px;
        display: grid;
        grid-auto-rows: 1fr;
        align-content: center;
    }
    .content li{
        transition:all .4s;
    }
</style>