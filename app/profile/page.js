import { getFetch } from "@/utils/fetch";
import { cookies } from "next/headers";
import React from "react";

async function ProfilePage() {
  const token = cookies().get("token");
  const user = await getFetch(
    "/profile/info",
    { Authorization: `Bearer ${token.value}` }
  );
  return (
    <div className="vh-70">
      <div className="row g-4">
        <div className="col col-md-6">
          <label className="form-label">نام و نام خانوادگی</label>
          <input
            type="text"
            className="form-control"
            defaultValue={user.name}
          />
        </div>
        <div className="col col-md-6">
          <label className="form-label">ایمیل</label>
          <input
            type="text"
            className="form-control"
            defaultValue={user.email}
          />
        </div>
        <div className="col col-md-6">
          <label className="form-label">شماره تلفن</label>
          <input
            type="text"
            disabled
            className="form-control"
            defaultValue={user.cellphone}
          />
        </div>
      </div>
      <button type="submit" className="btn btn-primary mt-4">
        ویرایش
      </button>
    </div>
  );
}

export default ProfilePage;
