import {defineStore} from 'pinia'
import axios from "@/plugins/axiosInstance";

export const useimgCounterStore = defineStore('imgCounter',{
    //数据保存
    state(){
        return{
            /* {
                user_id,
                avatar_img,
                avatar_type
            } */
            imageList:new Map(),
        }
    },
    actions:{
        //请求图片管理
        async requestImage(user_id,avatar_type){
            //仓库是否有用户头像
            if(this.imageList.has(user_id)){
                return this.getPicture(user_id);
            }
            //否则请求服务器用户头像
            return new Promise((resolve,reject)=>{
                axios({
                    url:`/moric/avatar`,
                    method:"post",
                    data:{
                        user_id,
                    }
                }).then((values)=>{
                    if(!values.data.body){
                        return;
                    }
                    this.savePicture(values.data.body,user_id,avatar_type);
                    resolve(this.getPicture(user_id));
                }).catch((err)=>{
                    console.log(err);
                    reject("失败");
                });
            });
        },
        //缓存图片
        savePicture(imgData,user_id,avatar_type){
            let blob = null;
            if(/^data:.*;base64,/.test(imgData)){
                //将base图片转为二进制图片
                const byteCharacters = atob(imgData.split(',')[1]);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                blob = new Blob([new Uint8Array(byteNumbers)], {type: `image/${avatar_type}`});
            }else{
                // 假设 imgData 为 JPG 图片的二进制数据
                blob = new Blob([imgData], { type: `image/${avatar_type}` });
            } 
            this.imageList.set(user_id,blob);
        },
        //返回图片url
        getPicture(user_id){
            let imageUrl = null;
            if(this.imageList.get(user_id)){
                // imageUrl = URL.createObjectURL(imageList.get(user_id));
                imageUrl = window.URL.createObjectURL(this.imageList.get(user_id));
            }
            // 生成图片的url地址
            return imageUrl;
        },
        //清除缓存图片
        clearImages(){
            for (const [user_id, blob] of imageList.entries()){
                URL.revokeObjectURL(blob);
                this.imageList.delete(user_id);
            }
        }
    }
});