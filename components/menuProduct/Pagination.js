'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

function Pagination({ links }) {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  function handelPage(e){
       const params = new URLSearchParams(searchParams);
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
