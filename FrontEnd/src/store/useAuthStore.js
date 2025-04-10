//
import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';

export const userAuthStore = create((set)=>({ 
    authUser:null,
    isSigningup:false,
    islogginIng:false,
    isUpdatingProfile:false,

    isCheckingAuth:true,

    checkAuth : async()=>{
        try{
            const res = await axiosInstance.get("/auth/check");
            set({authUser:res.data})
        }catch(error){
            console.log(error);
            set({authUser:null});
        }finally{
            set({isCheckingAuth:false});
        }
    }
}))