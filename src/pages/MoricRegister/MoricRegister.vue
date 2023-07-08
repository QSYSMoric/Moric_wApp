<template>
  <div class="MoricRegister">
        <MoricAppNavation name="登录" :msg="{
            path:'/',
            name:'MoricLogin',
        }"></MoricAppNavation>
        <MoricRegisterContent></MoricRegisterContent>
  </div>
</template>

<script>
import MoricRegisterContent from './components/MoricRegisterContent.vue';
import MoricAppNavation from '@/components/MoricAppNavation.vue';

export default {
    name:'MoricRegister',
    components:{
        MoricRegisterContent,
        MoricAppNavation
    }
}
</script>

<style>
    .MoricRegister{
        width: 100%;
        height: 100%;
        padding: 10px 24px 30pt 24px;
    }
    *{
        font-family: 'IOS','icomoon';
    }
</style>