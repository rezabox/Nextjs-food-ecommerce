'use client';
import { getAddresses } from "@/actions/contact";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Address({setAddressId}) {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(()=> {
     const fetchAddresses = async () => {
        const data = await getAddresses();
        setAddresses(data);
        setLoading(false);
     } 
     fetchAddresses()
  },[])
  if (loading) {
     return (<div className="spinner-border spinner-border-sm ms-2"></div>)
  }
  if(addresses.length == 0){
    return(<Link href="/profile/address" className="btn btn-primary col-md-3 h-30">ایجاد آدرس</Link>)
  }

  return (
    <>
      <div className="col-12 col-md-6  d-flex align-items-center ">
        <div>انتخاب آدرس</div>
        <select
          onChange={(e) => setAddressId(e.target.value)}
          style={{ width: "200px" }}
          defaultValue=''
          className="form-select ms-3"
          aria-label="Default select example"
        >
          <option value='' disabled>انتخاب آدرس</option>
          {addresses.map((address) => (
              <option key={address.id} value={address.id}>{address.title}</option>
          ))}
        </select>
      </div>
    </>
  );
}
export default Address;
