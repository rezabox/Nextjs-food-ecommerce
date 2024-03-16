'use client'
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import React from "react";
import SubmitButton from "@/components/SubmitButton";
import { AddressCreate } from "@/actions/contact";

function CreateForm({ provinces, cities }) {
  const [stateCreate, formActionCreate] = useFormState(AddressCreate, {});
  useEffect(() => {
    toast(stateCreate?.message, { type: `${stateCreate?.status}` });
  }, [stateCreate]);

  const [citiesFilter, setCitiesFilter] = useState(cities);
  function changeProvince(e) {
    setCitiesFilter((cities.filter(city => city.province_id == e.target.value)));
  }

  return (
    <div>
      <button
        className="btn btn-primary"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseExample"
      >
        ایجاد آدرس جدید
      </button>
      <form action={formActionCreate} className="collapse mt-3" id="collapseExample">
        <div className="card card-body">
          <div className="row g-4">
            <div className="col col-md-6">
              <label className="form-label">عنوان</label>
              <input name='title' type="text" className="form-control" />
            </div>
            <div className="col col-md-6">
              <label className="form-label">شماره تماس</label>
              <input name='cellphone' type="text" className="form-control" />
            </div>
            <div className="col col-md-6">
              <label className="form-label">کد پستی</label>
              <input name='postal_code' type="text" className="form-control" />
            </div>
            <div className="col col-md-6">
              <label className="form-label">استان</label>
              <select name="province_id" className="form-select" onChange={changeProvince}>
                {provinces.map(prow => (
                  <option key={prow.id} value={prow.id}>{prow.name}</option>
                ))}
              </select>
            </div>
            <div className="col col-md-6">
              <label className="form-label">شهر</label>
              <select name="city_id" className="form-select">
                {citiesFilter.map(city => (
                  <option key={city.id} value={city.id}>{city.name}</option> 
                ))}
              </select>
            </div>
            <div className="col col-md-12">
              <label className="form-label">آدرس</label>
              <textarea name="address" type="text" rows="5" className="form-control"></textarea>
            </div>
          </div>
          <div>
            <SubmitButton title="ایجاد" style="btn btn-primary mt-4 btn-auth" />
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreateForm;
