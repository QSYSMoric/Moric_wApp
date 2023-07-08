import axios from '@/plugins/axiosInstance';
import { useRouter } from "vue-router"
import { useCounterStore } from "@/store/index"
import { useChatRecordCounterStore } from '@/controllers/chatObjController'

const userUtils = {
    user:undefined,
    router:undefined,
    start(user){
        this.user = user;
        this.router = useRouter();
        this.store = useCounterStore();
        this.chatRecord = useChatRecordCounterStore();
    },
    //选择头像，并设置表单
    handleFileUpload(event,Register){
        let useP = this.user;
        //获取到上传的头像
        let files = event.target.files[0];
        let imgSrc = window.URL.createObjectURL(files);
        Register.src = imgSrc;
        //创建读取文件读取对象
        let reader = new FileReader();
        //判断文件类型
        
        if(/image/.test(files.type)){
            reader.readAsDataURL(files);
            this.user.typeof = "jpg";
        }else if(/png/.test(files.type)){
            reader.readAsDataURL(files);
            this.user.typeof = "png";
        }else if(/jpg/.test(files.type)){
            reader.readAsDataURL(files);
            this.user.typeof = "jpg";
            console.log(files.type);
        }else{
            reader.readAsText(files);
            this.user.typeof = "text";
        };
        //当文件加载完毕后调用这个函数
        reader.onload = function(){
            useP.img = reader.result;
        }
    },
    //用户名检测机制
    userNameDetection(){
        let moricAlert = "";
        let flag = false;
        if(/^[\u4E00-\u9FFFa-zA-Z0-9_\-\s]{2,30}$/.test(this.user.userName)){
            moricAlert = "成功";
            flag = true;
        }else{
            moricAlert = "用户名需在2~20字符之间";
            flag = false;
        }
        return {state:flag,data:moricAlert};
    },
    //登录验证
    loginSending(userMsg,login,loginClass){
        axios({
            url:`/moric/register`,
            method:'post',
            data:userMsg
        }).then((value)=>{
            if(value.data.state){
                console.log(value.data.body.user_id);
                alert("你的id：" + value.data.body.user_id);
                login.alert.data = "你的id：" + value.data.body.user_id;
                loginClass.success = true;
                loginClass.fail = false;
                // 将 Token 保存到本地存储中
                sessionStorage.setItem('token', value.data.token);
                sessionStorage.setItem('self', JSON.stringify(value.data.body)), 
                this.store.self = value.data.body;
                this.chatRecord.user_id = value.data.body.user_id;
                this.jump();
            }else{
                alert(value.data.state);
                login.alert.data = value.data.alert;
                loginClass.success = false;
                loginClass.fail = true;
            }
        });
    },
    jump(){
        this.router.push({
            path:'/MoricHome/MoricMsg',
            name:"MoricMsg",
            query:{
                msg:"hello"
            }
        });
    }
}

export default userUtils;