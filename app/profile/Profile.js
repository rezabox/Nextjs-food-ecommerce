"use client";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import React from "react";
import SubmitButton from "@/components/SubmitButton";
import { ProfileEdit } from "@/actions/contact";

function Profile({ ProfileUser }) {
  const [state, formAction] = useFormState(ProfileEdit, {});
  useEffect(() => {
    toast(state?.message, { type: `${state?.status}` });
  }, [state]);
  return (
    <form action={formAction}>
      <div className="vh-70">
        <div className="row g-4">
          <div className="col col-md-6">
            <label className="form-label">نام و نام خانوادگی</label>
            <input
              type="text"
              name="name"
              className="form-control"
              defaultValue={ProfileUser.name}
            />
          </div>
          <div className="col col-md-6">
            <label className="form-label">ایمیل</label>
            <input
              type="text"
              name="email"
              className="form-control"
              defaultValue={ProfileUser.email}
            />
          </div>
          <div className="col col-md-6">
            <label className="form-label">شماره تلفن</label>
            <input
              type="text"
              disabled
              className="form-control"
              defaultValue={ProfileUser.cellphone}
            />
          </div>
        </div>
        <SubmitButton title="ویرایش" style="btn btn-primary mt-4 btn-auth" />
      </div>
    </form>
  );
}

export default Profile;
