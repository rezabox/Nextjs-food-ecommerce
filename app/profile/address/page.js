import CreateForm from "@/components/profile/addressess/CreateForm";
import { getFetch } from "@/utils/fetch";
import { cookies } from "next/headers";
import React from "react";

async function address() {
  const token = cookies().get('token');
  const { addresses, provinces, cities } = await getFetch(
    "/profile/addresses",
     { 'Authorization': `Bearer ${token.value}` }
    );
  return (
    <div className="col-sm-12 col-lg-9">
      <CreateForm  addresses={addresses} provinces={provinces} cities={cities} />
      <hr />
      {/* <div className="card card-body">
        <div className="row g-4">
          <div className="col col-md-6">
            <label className="form-label">عنوان</label>
            <input type="text" value="منزل" className="form-control" />
          </div>
          <div className="col col-md-6">
            <label className="form-label">شماره تماس</label>
            <input type="text" value="09111111111" className="form-control" />
          </div>
          <div className="col col-md-6">
            <label className="form-label">کد پستی</label>
            <input type="text" value="4586-2115" className="form-control" />
          </div>
          <div className="col col-md-6">
            <label className="form-label">استان</label>
            <select className="form-select">
              <option selected>تهران</option>
              <option value="1">اصفهان</option>
              <option value="2">فارس</option>
              <option value="3">یزد</option>
            </select>
          </div>
          <div className="col col-md-6">
            <label className="form-label">شهر</label>
            <select className="form-select">
              <option selected>تهران</option>
              <option value="1">اصفهان</option>
              <option value="2">شیراز</option>
              <option value="3">یزد</option>
            </select>
          </div>
          <div className="col col-md-12">
            <label className="form-label">آدرس</label>
            <textarea type="text" rows="5" className="form-control">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
              استفاده از طراحان گرافیک است.
            </textarea>
          </div>
        </div>
        <div className="d-flex justify-content-between mt-4">
          <button className="btn btn-primary">ویرایش</button>
          <button className="btn btn-dark">حذف</button>
        </div>
      </div> */}
    </div>
  );
}

export default address;
