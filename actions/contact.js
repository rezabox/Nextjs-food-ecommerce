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

export { create };