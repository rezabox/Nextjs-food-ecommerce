"use server";

import { postFetch } from "@/utils/fetch";
import { handleError } from "@/utils/help";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

async function create(state, formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const subject = formData.get("subject");
  const text = formData.get("text");
  if (name === "" || email === "" || subject === "" || text === "") {
    return {
      status: "error",
      message: "تمام موارد فرم تماس الزامی است .",
    };
  }
  const res = await postFetch("/contact-us", { name, email, subject, text });

  if (res.status === "success") {
    return {
      status: res.status,
      message: "پیام با موقیت ثبت شد",
    };
  } else {
    return {
      status: res.status,
      message: handleError(res.message),
    };
  }
}
async function ProfileEdit(state, formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  if (name === "" || email === "") {
    return {
      status: "error",
      message: "تمام موارد فرم پروفایل برای ویرایش الزامی است .",
    };
  }
  const token = cookies().get('token');
  const res = await postFetch("/profile/info/edit", { name, email }, { 'Authorization': `Bearer ${token.value}` });

  if (res.status === "success") {
    return {
      status: res.status,
      message: "پیام با موقیت ثبت شد",
    };
  } else {
    return {
      status: res.status,
      message: handleError(res.message),
    };
  }
}
async function AddressCreate(stateCreate, formActionCreate) {
  const title = formActionCreate.get("title");
  const cellphone = formActionCreate.get("cellphone");
  const postal_code = formActionCreate.get("postal_code");
  const province_id = formActionCreate.get("province_id");
  const city_id = formActionCreate.get("city_id");
  const address = formActionCreate.get("address");
  
  if (title === "" || address === "") {
    return {
      status: "error",
      message: "تمام موارد فرم آدرس برای ویرایش الزامی است .",
    };
  }
  const cellphonePattern = /^(\+98|0)?9\d{9}$/i;
  if(cellphone === '' || !cellphonePattern.test(cellphone)){
    return {
      status: "error",
      message:"فیلد شماره تماس نامعتبر است",
    }
  }
  const postalPattern = /^\d{5}[ -]?\d{5}$/i;
  if(postal_code === '' || !postalPattern.test(postal_code)){
      return {
        status: "error",
        message:"فیلد کد پستی نامعتبر است ."
      }
  }

  const token = cookies().get('token');
  const res = await postFetch("/profile/addresses/create", { title, cellphone, postal_code, province_id, city_id, address }, { 'Authorization': `Bearer ${token.value}` });

  if (res.status === "success") {
    return {
      status: res.status,
      message: "پیام با موقیت ثبت شد",
    };
  } else {
    return {
      status: res.status,
      message: handleError(res.message),
    };
  }
}
async function editForm(stateEdit, formActionEdit) {
  const title = formActionEdit.get("title");
  const cellphone = formActionEdit.get("cellphone");
  const postal_code = formActionEdit.get("postal_code");
  const province_id = formActionEdit.get("province_id");
  const city_id = formActionEdit.get("city_id");
  const address = formActionEdit.get("address");
  const address_id = formActionEdit.get("address_id");
  
  if (title === "" || address === "") {
    return {
      status: "error",
      message: "تمام موارد فرم آدرس برای ویرایش الزامی است .",
    };
  }
  if (address_id === "" || null) {
    return {
      status: "error",
      message: "شناسه آدرس الزامی است.",  
    };
  }
  const cellphonePattern = /^(\+98|0)?9\d{9}$/i;
  if(cellphone === '' || !cellphonePattern.test(cellphone)){
    return {
      status: "error",
      message:"فیلد شماره تماس نامعتبر است",
    }
  }
  const postalPattern = /^\d{5}[ -]?\d{5}$/i;
  if(postal_code === '' || !postalPattern.test(postal_code)){
      return {
        status: "error",
        message:"فیلد کد پستی نامعتبر است ."
      }
  }

  const token = cookies().get('token');
  const res = await postFetch("/profile/addresses/edit", { title, cellphone, postal_code, province_id, city_id, address, address_id }, { 'Authorization': `Bearer ${token.value}` });

  if (res.status === "success") {
    return {
      status: res.status,
      message: "آدرس با موفقیت ویرایش شد.",
    };
  } else {
    return {
      status: res.status,
      message: handleError(res.message),
    };
  }
}
async function deletedForm(stateDelete, formActionDelete) {
  const address_id = formActionDelete.get('address_id');
  if(address_id === '' || null){
    return {
      status: "error",
      message: "شناسه آدرس الزامی است.",  
    };
  }
  const token = cookies().get('token');
  const res = await postFetch("/profile/addresses/delete", { address_id }, { 'Authorization': `Bearer ${token.value}` });

  if (res.status === "success") {
    revalidatePath("/profile/address")
    return {
      status: res.status,
      message: "حذف آدرس با موفقیت انجام شد.",
    };
  } else {
    return {
      status: res.status,
      message: handleError(res.message),
    };
  }
}

async function login(stateLogin, formData) {
  const cellphone = formData.get("cellphone");
  if (cellphone === "") {
    return {
      status: "error",
      message: "شماره موبایل الزامی است.",
    };
  }
  const pattern = /^(\+98|0)?9\d{9}$/;
  if (!pattern.test(cellphone)) {
    return {
      status: "error",
      message: "فرمت شماره موبایل درست نیست.",
    };
  }
  const data = await postFetch("/auth/login", { cellphone });
  if (data.status === "success") {
    cookies().set({
      name: "login_token",
      value: data.data.login_token,
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });
    return {
      status: data.status,
      message: "کد تائید با موفقیت برای شما ارسال شد.",
    };
  } else {
    return {
      status: data.status,
      message: handleError(data.message),
    };
  }
}
async function checkOtp(stateLoginOtp, formData) {
  const otp = formData.get("otp");
  if (otp === "") {
    return {
      status: "error",
      message: "کد تایید الزامی است.",
    };
  }
  const pattern = /^[0-9]{6}$/;
  if (!pattern.test(otp)) {
    return {
      status: "error",
      message: "کد تایید را درست وارد کنید",
    };
  }

  const login_Token = cookies().get("login_token");
  if (!login_Token) {
    return {
      status: "error",
      message: "توکن ورودی شما معتبر نیست.",
    };
  }
  const data = await postFetch("/auth/check-otp", {
    otp,
    login_token: login_Token.value,
  });
  if (data.status === "success") {
    cookies().delete("login_token");
    cookies().set({
      name: "token",
      value: data.data.token,
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });
    return {
      status: data.status,
      message: "شما با موفقیت وارد شدید.",
      user: data.data.user,
    };
  } else {
    return {
      status: data.status,
      message: handleError(data.message),
    };
  }
}
async function me() {
  const token = cookies().get("token");

  if (!token) {
    return {
      error: "Not Authorized",
    };
  }

  const data = await postFetch(
    "/auth/me",
    {},
    { Authorization: `Bearer ${token.value}` }
  );
  if (data.status === "success") {
    return {
      user: data.data,
    };
  } else {
    return {
      error: "User Forbidden",
    };
  }
}
async function ResendOtp(stateResendOtp, formData) {
  const token = cookies().get("login_token");

  if (!token) {
    return {
      status: "error",
      message: "توکن ورودی شما معتبر نیست.",
    };
  }

  const data = await postFetch(
    "/auth/resend-otp",
    { login_token: token.value },
  );
  if (data.status === "success") {
    cookies().set({
      name: "login_token",
      value: data.data.login_token,
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });
    return {
      status: data.status,
      message: "کد ورود با موفقیت برای شما ارسال شد",
      user: data.data.user
    };
  } else {
    return {
      status: data.status,
      message: handleError(data.message),
    };
  }
}
export { create, login, checkOtp, me, ResendOtp, ProfileEdit, AddressCreate, editForm, deletedForm };
