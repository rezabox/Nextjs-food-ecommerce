"use server";

import { postFetch } from "@/utils/fetch";
import { handleError } from "@/utils/help";
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
export { create, login, checkOtp, me, ResendOtp };
