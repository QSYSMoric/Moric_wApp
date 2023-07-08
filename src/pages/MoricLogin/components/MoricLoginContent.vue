<template>
    <div class="moricLoginContent">
        <div class="loginTile">
            <h1>
                Login to your
            </h1>
            <h1>
                Id
            </h1>
        </div>
        <div class="loginFrom">
            <form action="#" class="loginFromContent">
                <div class="loginId">
                    <input 
                    type="text" 
                    placeholder=" Id" 
                    v-model.number="userLogin.userID">
                </div>
                <div class="loginPassword">
                    <input type="password" 
                    autocomplete="off" 
                    placeholder=" pas"
                    v-model="userLogin.password">
                </div>
                <div class="loginCheckBox">
                    <label class="checkbox-container">
                        <input type="checkbox">
                        <span class="checkmark"></span>隐私通知
                    </label>
                </div>
                <div class="loginSubmit">
                    <a @click.stop="loginClick">登录</a>
                </div>
            </form>
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
                    <p>还没有账号?<a @click.stop="registerOnclick">去注册</a></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive } from 'vue';
import MoricLogin from '../scripts/MoricLogin';

export default {
    name:"MoricLoginContent",
    setup(){
        MoricLogin.start();
        const userLogin = reactive({
            userID:"",
            password:""
        });
        //登录按钮
        function loginClick(){
            let loginMsg = {
                userID:userLogin.userID,
                password:userLogin.password
            }
            if(!loginMsg.userID || !loginMsg.password){
                alert("请输入完整信息");
            }else{
                MoricLogin.loginHandler(loginMsg);
            }
        }
        //跳转部分
        function registerOnclick(){
            MoricLogin.goRegisterContent();
        }
        return{
            userLogin,
            loginClick,
            registerOnclick
        }
    }
}
</script>
<style>
    .loginTile{
        margin-top: 50px;
        width: 100%;
        height: 92pt;
        display: flex;
        justify-content: center;
        align-content: center;
        align-items: center;
        flex-direction: column;
    }
    .loginTile h1{
        font-family: 'Luckiest';
        font-size: 28pt;
        letter-spacing: 5px;
        line-height: 1.2em;
        font-weight: 400;
    }
    .loginFrom{
        width: 100%;
        min-height: 100pt;
        padding: 10px 20px;
    }
    .loginFromContent{
        width: 100%;
        height: 210pt;
        display: grid;
        align-items: center;
        grid-template-rows: 1fr 1fr 30pt 40pt;
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
        margin-top: 20px;
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
</style>