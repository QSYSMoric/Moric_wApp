import { createRouter,createWebHashHistory } from "vue-router";
import MoricHomeRouters from '../pages/MoricHome/routers/index'
import validateLogon from "@/plugins/validateLogon";

const routes = [
    {
        path:'/MoricPerson',
        name:'MoricPerson',
        component:()=>import('../pages/MoricPerson/MoricPerson.vue'),
    },
    {
        path:'/MoricRegister',
        name:'MoricRegister',
        component:()=>import('../pages/MoricRegister/MoricRegister.vue'),
    },
    {
        path:'/',
        name:'MoricLogin',
        component:()=>import('../pages/MoricLogin/MoricLogin.vue'),
    },
    {
        path:'/MoricHome',
        name:'MoricHome',
        component:()=>import('../pages/MoricHome/MoricHome.vue'),
        children:MoricHomeRouters,
        meta:{
            requiresAuth: true
        },
        beforeEach(to,from){
            console.log("路由信息(下一个路由):"+to.path)
            if(to.path == ""){
                return {
                    path:'/MoricMsg'
                }
            }
            next();
        }
    }
];

const router = createRouter({
    history:createWebHashHistory(),
    routes
});

// 设置默认路由为 Login 组件
router.beforeEach((to, from, next) => {
    if(to.meta.requiresAuth && !validateLogon.isUserOnline()){
        alert("你还未登录");
        next('/');
    }else{
        next();
    }
});
export default router;