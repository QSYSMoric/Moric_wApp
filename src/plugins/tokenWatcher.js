import router from "@/routers/index"

export default {
    //获取token
    getToken(){
        let token = sessionStorage.getItem('token');
        return token;
    },
    //如果token过期
    handleTokenExpiration(){
        alert("token已过期，请重新登录");
        router.push({
            path:'/',
            name:"MoricLogin",
        });
    }
}