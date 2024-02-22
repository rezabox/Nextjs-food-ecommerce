'use client'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

function Pagination({ links }) {
  const pathName = usePathname();
  const router = useRouter();
  function handelPage(e){
       const params = new URLSearchParams();
       params.set('page', e);
       router.replace(`${pathName}?${params}`)
  }
  return (
    <div>
          <ul className="pagination">
               {links.slice(1,-1).map((item,index)=>(
                <li key={index} className={item.active ? 'page-item active' : 'page-item'}>
                  <button className="page-link" onClick={() => handelPage(item.label)}>
                    {item.label}
                  </button>
                </li>
               ))}
          </ul>
    </div>
  )
}

export default Pagination
