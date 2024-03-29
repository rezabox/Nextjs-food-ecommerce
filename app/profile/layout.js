'use client';
import { logout } from "@/actions/contact";
import AuthContext from "@/context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";

function Layout({ children }) {
  const path = usePathname();
  const { logoutContext } = useContext(AuthContext);
  const router = useRouter() 

  return (
    <div>
      <section className="profile_section layout_padding">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-lg-3">
              <ul className="list-group">
                <li className='list-group-item'>
                  <Link href="/profile" className={path === '/profile' ? 'grid' : ''}>اطلاعات کاربر</Link>
                </li>
                <li className="list-group-item">
                  <Link href="/profile/address" className={path === '/profile/address' ? 'grid' : ''}>آدرس ها</Link>
                </li>
                <li className="list-group-item">
                  <Link href="/profile/order" className={path === '/profile/order' ? 'grid' : ''}>سفارشات</Link>
                </li>
                <li className="list-group-item">
                  <Link href="/profile/transactions" className={path === '/profile/transaction' ? 'grid' : ''}>تراکنش ها</Link>
                </li>
                <li className="list-group-item">
                  <Link href="#" className={path === '/profile/exit' ? 'grid' : ''} onClick={async () => {
                     await logout();
                     logoutContext()
                     router.push('/');
                  }}>خروج</Link>
                </li>
              </ul>
            </div>
            <div className="col-sm-12 col-lg-9">{children}</div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Layout;
