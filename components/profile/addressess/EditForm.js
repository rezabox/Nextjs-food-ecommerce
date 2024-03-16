"use client";
import { editForm } from "@/actions/contact";
import SubmitButton from "@/components/SubmitButton";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

function EditForm({ address, provinces, cities }) {
  const [citiesFilter, setCitiesFilter] = useState(cities);
  const [stateEdit, formActionEdit] = useFormState(editForm, {});
  
  useEffect(() => {
    toast(stateEdit?.message, { type: `${stateEdit?.status}` });
  }, [stateEdit]);

  function changeProvince(e) {
    setCitiesFilter((cities.filter(city => city.province_id == e.target.value)));
  }
  return (
    <div>
        <div
          key={address.id}
          className="position-relative"
        >
          <form action={formActionEdit} className="card card-body mt-3">
            <div className="row g-4">
              <div className="col col-md-6">
                <label className="form-label">عنوان</label>
                <input name="title" defaultValue={address.title} type="text" className="form-control" />
              </div>
              <div className="col col-md-6">
                <label className="form-label">شماره تماس</label>
                <input name="cellphone" defaultValue={address.cellphone} type="text" className="form-control" />
              </div>
              <div className="col col-md-6">
                <label className="form-label">کد پستی</label>
                <input
                  name="postal_code"
                  defaultValue={address.postal_code}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col col-md-6">
                <label className="form-label">استان</label>
                <select
                  name="province_id"
                  defaultValue={address.province_id}
                  className="form-select"
                  onChange={changeProvince}
                >
                  {provinces.map((prow) => (
                    <option key={prow.id} value={prow.id}>
                      {prow.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col col-md-6">
                <label className="form-label">شهر</label>
                <select name="city_id" defaultValue={address.city_id} className="form-select">
                  {citiesFilter.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col col-md-12">
                <label className="form-label">آدرس</label>
                <textarea
                  name="address"
                  type="text"
                  defaultValue={address.address}
                  rows="5"
                  className="form-control"
                ></textarea>
              </div>
              <input type="hidden" name="address_id" value={address.id} />
            </div>
            <div>
              <SubmitButton
                title="ویرایش"
                style="btn btn-primary mt-4 btn-auth"
              />
            </div>
          </form>
          <div className="form-delete-address">
               <button className="btn btn-dark">حذف</button>
          </div>
        </div>
    </div>
  );
}

export default EditForm;
