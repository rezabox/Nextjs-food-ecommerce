import { getFetch } from "@/utils/fetch";
import { cookies } from "next/headers";
import React from "react";
import Profile from "./Profile";

async function ProfilePage() {
  const token = cookies().get("token");
  console.log(token);
  const user = await getFetch(
    "/profile/info",
    { Authorization: `Bearer ${token.value}` }
  );
  return (
     <Profile ProfileUser={user}/>    
  );
}

export default ProfilePage;
