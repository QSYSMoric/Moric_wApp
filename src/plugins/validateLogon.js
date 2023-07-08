import Cookies from "js-cookie";

// 更改默认配置

export default {
    //监听用户是否为登录状态
    isUserOnline(){
    let cookie = Cookies.get('isLoggedin') // => 'value'

    return cookie?true:false;
    //    return true;
    },
    //获取token
    getToken(){
    //
        let token = sessionStorage.getItem('token');
        return token;
    },
};