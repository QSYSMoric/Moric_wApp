<template>
    <div class="content">
        <div class="title">
                JOIN IN
        </div>
        <form action="">
            <div class="contentForm">
                <div class="headSculpture">
                    <div class="inputSearch">
                        <img :src="Register.src" v-if="Register.src" alt="头像">
                        <div class="inputheadSculpture">
                            <input type="file" title="headSculpture" 
                            @change="handleFileUpload"
                            placeholder="上传头像">
                        </div>
                    </div>
                </div>
                <div class="loginId">
                    <input type="text" v-model="user.userName" placeholder=" Name">
                </div>
                <div class="loginPassword">
                    <input type="password" v-model="user.userPassWord" autocomplete="off" placeholder=" pas">
                </div>
                <div class="loginCheckBox">
                    <label class="checkbox-container">
                        <input type="checkbox">
                        <span class="checkmark"></span>隐私通知
                    </label>
                </div>
                <div class="loginSubmit">
                    <a @click.stop="sumitUser">注册</a>
                </div>
            </div>
        </form>
        <div class="alert" :class="RegisterClass">
            提示：{{Register.alert.data}}
        </div>
        <div class="loginOther">
            <p>其他登录方式?</p>
            <div class="loginOtherContent">
                <div class="loginOtherContentTop">
                    <ul>
                        <li style="color: #167efd;"></li>
                        <li style="color: #d52c2b;"></li>
                        <li style="color: #28a8ea;"></li>
                    </ul>                    
                </div>
                <div class="loginOtherContentBottom">
                    <p>还没有账号?<a href="#" @click.stop>去注册</a></p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { reactive } from 'vue';
// import { useRoute, useRouter } from "vue-router"
import RegisterUtil from "../scripts/MoricRegister"

export default {
    name:'MoricRegisterContent',
    setup(){
        let user = reactive({
            img:"",
            typeof:"",
            userName:"",
            userPassWord:""
        });
        let Register = reactive({
            src:'',
            alert:{
                state:true,
                data:"",
            },
        });
        let RegisterClass = reactive({
            success:false,
            fail:false,
        });
        RegisterUtil.start(user);
        //点击上传图片
        function handleFileUpload(event){
            RegisterUtil.handleFileUpload(event,Register);
        }
        //注册按钮
        function sumitUser(){
            //归类信息
            let userMsg = {
                img:user.img,
                imgtype:user.typeof,
                name:user.userName,
                password:user.userPassWord,
            }
            //检查语法
            Register.alert = RegisterUtil.userNameDetection();
            //检查是否合格
            if(Register.alert.state){
                RegisterClass.success = true;
                RegisterUtil.loginSending(userMsg,Register,RegisterClass);
            }else{
                RegisterClass.fail = true;
            }
        }
        return {
            handleFileUpload,
            user,
            sumitUser,
            Register,
            RegisterClass,
        }
    },
}
</script>

<style scoped>
    .alert{
        width: 100%;
        height: 100%;
        padding: 10px 20px;
        display: flex;
        align-items: center;
        font-size: 18pt;
    }
    .success{
        color: #53d96a;
    }
    .fail{
        color: #fc3d39;
    }
    .content{
        padding-top: 40px;
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-rows:80pt max-content 50pt max-content;
    }
    .title{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: 'Luckiest';
        font-size: 40pt;
        letter-spacing: 5px;
        word-spacing: 10px;
    }
    input[type="text"],
    input[type="password"]{
        font-family: 'icomoon','ios';
        text-indent: 20px;
        border: none;
        width: 90%;
        height: 100%;
        border-radius: 12px;
        background-color: #f0eff4;
    }
    .contentForm{
        width: 100%;
        min-height: 250pt;
        display: grid;
        align-items: center;
        grid-template-rows: 80pt 50pt 50pt 40pt;
        gap: 10px;
    }
    .headSculpture{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .inputSearch{
        position: relative;
        width: 80pt;
        height: 80pt;
        border-radius: 50%;
        background: #f4f4f4;
    }
    .inputSearch img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
    }
    .inputheadSculpture{
        position: absolute;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 20pt;
        height: 20pt;
        border-radius: 50%;
        font-size: 14pt;
        font-weight: 400;
        background-color:  #f0eff4;
        opacity: 0.8;
        color:  #052630;
        cursor:pointer;
    }
    .inputheadSculpture input{
        width: 100%;
        height: 100%;
        opacity: 0;
    }
    .inputheadSculpture::after{
        position: absolute;
        content: '';
        z-index: -10;
    }
    .loginId{
        display: flex;
        justify-content: center;
        width: 100%;
        height: 34pt;
        border-radius: 12px;
    }
    .loginId input{
        font-size: 18pt;
    }
    .loginPassword{
        display: flex;
        justify-content: center;
        width: 100%;
        height: 34pt;
        border-radius: 12px;  
    }
    .loginPassword input{
        font-size: 18pt;
    }
    .loginCheckBox{
        display: flex;
        margin-left: 2em;
        justify-content: left;
        align-items: center;
        width: 100%;
        height: 24pt;
        border-radius: 12px;  
        font-size: 8pt;
    }
    .checkbox-container{
        height: max-content;
    }
    .checkbox-container input {
        width: 100%;
        display: none;
        white-space:nowrap;
    }
    /* 定义自定义复选框的样式 */
    .checkbox-container .checkmark {
        display: inline-block;
        width: 10pt;
        height: 10pt;
        border-radius: 15px;
        border: 1px solid #ccc;
        vertical-align: middle;
        cursor: pointer;
        margin-right: 10px;
    }
    /* 当复选框被选中时，修改复选框的外观 */
    .checkbox-container input:checked + .checkmark:before {
        content: '\2714'; /* Unicode字符编码，表示勾号 */
        display: block;
        text-align: center;
        font-size: 8pt;
        line-height: 10pt; /* 与复选框的高度相同 */
    }
    .loginSubmit{
        display: flex;
        justify-content: center;
        width: 100%;
        height: 34pt;
        border-radius: 12px;  
    }
    .loginSubmit a{
        font-style: normal;
        text-decoration: none;
        display: inline-block;
        background: #052630;
        color: #f2efe5;
        width: 90%;
        height: 100%;
        font-size: 17pt;
        border-radius: 12px;
        text-align: center;
        line-height: 34pt;
    }
    .loginOther{
        margin-top: 10px;
        width: 100%;
        min-height: 100pt;
        border-radius: 15px;
        padding: 10px 20px 0 20px;
    }
    .loginOther p{
        display: flex;
        width: 100%;
        height: 20pt;
        font-size: 10pt;
    }
    .loginOtherContent{
        width: 100%;
        min-height: 60pt;
    }
    .loginOtherContentTop{
        display: flex;
        justify-content: center;
        height: 30pt;
        width: 100%;
    }
    .loginOtherContentTop ul{
        width: 60%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .loginOtherContentTop ul li{
        margin-top: .8em;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 32pt;
        height: 32pt;
        font-size: 16pt;
        background: #f0eff4;
        /* box-shadow: 0 0 2px #f0eff4; */
        border-radius: 12px;
    }
    .loginOtherContentBottom{
        margin-top: 2em;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 100%;
        height: 20pt;
    }
    .loginOtherContentBottom p{
        display: flex;
        width: max-content;
        align-items: center;
    }
    .loginOtherContentBottom a{
        text-decoration: none;
        color: #167efd;
    }
</style>../scripts/MoricRegister