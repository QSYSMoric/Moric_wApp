import { useRouter } from "vue-router"
import axios from '@/plugins/axiosInstance';
import { useCounterStore } from '@/store/index';
import { useChatRecordCounterStore } from '@/controllers/chatObjController'

export default {
    router:undefined,
    start(){
        this.router = useRouter();
        this.store = useCounterStore ();
        this.chatObjController = useChatRecordCounterStore();
    },
    //跳转
    jump(){
        this.router.push({
            path:'/MoricHome/MoricMsg',
            name:"MoricMsg",
            query:{
                msg:"hello"
            }
        });
    },
    //跳转到登录部分
    goRegisterContent(){
        this.router.push({
            path:'/MoricRegister',
            name:"MoricRegister",
            query:{
                msg:"hello"
            }
        });
    },
    //登录请求部分
    loginHandler(loginMsg){
        axios({
            url:"/moric/login",
            method:"post",
            data:loginMsg,
        }).then((values)=>{
            if(values.data.state){
                alert(values.data.alert);
                const {user} = values.data.body;
                this.store.self = user;
                // 将 Token 保存到本地存储中
                sessionStorage.setItem('token', values.data.token);
                sessionStorage.setItem('self', JSON.stringify(user)), 
                this.chatObjController.user_id = user.user_id;
                this.jump();
            }else{
                alert(values.data.alert);
                location.reload();
            }
        });
    }
};