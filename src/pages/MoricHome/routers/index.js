const routes = [
    {
        path:"",
        name:"MoricHomeIndex",
        redirect:{
            name:"MoricMsg"
        },
        meta:{
            requiresAuth: true
        }
    },
    {
        path:"MoricMsg",
        name:"MoricMsg",
        component:()=>import('@/pages/MoricHome/components/MoricMsg/MoricUserList.vue'),
        props:true,
        meta:{
            requiresAuth: true
        }
    },
    {
        path:"MoricChatInterface",
        name:"MoricChatInterface",
        component:()=>import('../components/MoricChatInterface/MoricChatInterface.vue'),
        meta:{
            requiresAuth: true
        }
    }
];

export default routes;