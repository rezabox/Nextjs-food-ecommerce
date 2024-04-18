import CreateForm from "@/components/profile/addressess/CreateForm";
import EditForm from "@/components/profile/addressess/EditForm";
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
      <CreateForm  provinces={provinces} cities={cities} />
      <hr />
      {addresses.map(address => (
        <EditForm address={address} provinces={provinces} cities={cities} />
      ))}
    </div>
  );
}

export default address;
