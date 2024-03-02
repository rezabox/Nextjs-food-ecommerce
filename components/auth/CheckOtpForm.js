"use client";
import React, { useContext, useEffect, useReducer } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import SubmitButton from "../SubmitButton";
import { checkOtp } from "@/actions/contact";
import AuthContext from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import ResendButton from "./ResendButton";
import { useRouter } from "next/navigation";

function CheckOtpForm() {
  const [stateLoginOtp, formActionOtp] = useFormState(checkOtp, {});
  const { loginContext } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    toast(stateLoginOtp?.message, { type: `${stateLoginOtp?.status}` });
    if (stateLoginOtp?.status === "success") {
      loginContext(stateLoginOtp.user);
      router.push('/');
    }
  }, [stateLoginOtp]);
  return (
    <div className="card">
      <div className="card-body">
        <div className="form_container">
          <form action={formActionOtp}>
            <div className="mb-3">
              <label className="form-label">کد ورود</label>
              <input name="otp" type="text" className="form-control" />
            </div>
            <SubmitButton title="ورود" style="btn btn-primary btn-auth" />
          </form>
            <ResendButton />
        </div>
      </div>
    </div>
  );
}

export default CheckOtpForm;
