import React from "react";

function Address() {
  return (
    <>
      <div className="col-12 col-md-6  d-flex align-items-center ">
        <div>انتخاب آدرس</div>
        <select
          style={{ width: "200px" }}
          className="form-select ms-3"
          aria-label="Default select example"
        >
          {/* <option selected>منزل</option>
          <option defaultValue={1}>محل کار</option> */}
        </select>
        <a href="profile.html" className="btn btn-primary ">
          ایجاد آدرس
        </a>
      </div>
    </>
  );
}
export default Address;
