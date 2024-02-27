'use client'
import { login } from "@/actions/contact";
import React, { useEffect } from "react";

import { useFormState } from 'react-dom'
import { toast } from 'react-toastify';
import SubmitButton from "../SubmitButton";

function LoginForm({setStep}) {
  const [stateLogin, formActionLogin] = useFormState(login, {});
  useEffect(()=> {
    toast(stateLogin?.message, { type: `${stateLogin?.status}` })
    if(stateLogin?.status === 'success'){
        setStep(2);
    }
  },[stateLogin])
  return (
    <div>
      <div className="card">
                <div className="card-body">
                  <div className="form_container">
                    <form action={formActionLogin}>
                      <div className="mb-3">
                        <label className="form-label">شماره موبایل</label>
                        <input name='cellphone' type="text" className="form-control" />
                      </div>
                      <SubmitButton title="ورود" style="btn btn-primary btn-auth"/>
                    </form>
                  </div>
                </div>
              </div>
    </div>
  )
}

export default LoginForm;
