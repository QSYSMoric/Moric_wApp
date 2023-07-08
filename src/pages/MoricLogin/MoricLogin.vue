<template>
  <div class="MoricLogin">
    <MoricAppNavation name="首页" :msg="{
            path:'/',
            name:'MoricLogin',
        }"></MoricAppNavation>
    <MoricLoginContent></MoricLoginContent>
  </div>
</template>

<script>
import MoricAppNavation from '@/components/MoricAppNavation.vue';
import MoricLoginContent from '@/pages/MoricLogin/components/MoricLoginContent.vue'
export default {
    name:"MoricLogin",
    components:{
        MoricAppNavation,
        MoricLoginContent
    }
}
</script>

<style scoped>
    .MoricLogin{
        width: 100%;
        height: 100%;
        padding: 10px 24px 30pt 24px;
    }
    *{
        font-family: 'IOS','icomoon';
    }
</style>