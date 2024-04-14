"use client"
import { me } from "@/actions/contact";
import { getFetch } from "@/utils/fetch";
import { createContext, useEffect, useState } from "react"
import { toast } from "react-toastify";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
      const checkUserLoggedIn = async () => {
         const data =  await me();
         if(data?.error) {
            setUser(null);
         } else {
           setUser(data.user);
         }
      }
      checkUserLoggedIn();
  }, [])

  const loginContext = (user) => {
    setUser(user)
  }

  const logoutContext = (user) => {
    setUser(null)
    toast.success('خروج با موفقیت انجام شد.')
  }
  return(
    <AuthContext.Provider value={{ user,loginContext, logoutContext }}>
        { children }
    </AuthContext.Provider>
  )
} 
export default AuthContext;