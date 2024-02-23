"use server";

import { postFetch } from "@/utils/fetch";
import { handleError } from "@/utils/help";

async function create(state, formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  const subject = formData.get('subject');
  const text = formData.get('text');
    if(name === "" || email === "" || subject === "" || text === ""){
        return{
               status: "error",
               message: "تمام موارد فرم تماس الزامی است ."
            }
    }
    const res = await postFetch('/contact-us', { name, email, subject, text });
    
    if(res.status === 'success'){
         return{
           status: res.status,
           message: "پیام با موقیت ثبت شد",
         }  
    }else{
        return{
           status: res.status,
           message: handleError(res.message)
        }
    }
}
async function login(stateLogin, formData){
  const phone = formData.get('cellphone')
  if(phone === ''){
    return {
      status: "error",
      message: "شماره موبایل الزامی است."
    }
  }
  const pattern = /^(\+98|0)?9\d{9}$/;
  if(!pattern.test(phone)){
    return {
      status: "error",
      message: "فرمت شماره موبایل درست نیست."
    }
  }
}
export { create, login };