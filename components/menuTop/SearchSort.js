'use client'
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
function SearchSort() {
  const [term,setTerm] = useState();
  const route = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  function handleSearch(Search) {
    const params = new URLSearchParams(searchParams);
    params.delete('post');
    if (Search){
        params.delete('search');
        setTerm('');
    } else {
        params.set('search', term)
    }
    route.replace(`${pathName}?${params.toString()}`)
  }
  return (
    <div>
      <label className="form-label">جستجو</label>
      {searchParams.has('search') && 
       <span onClick={() => handleSearch(true)} className="text-danger fs-4 cursor-pointer">
           <i className="bi bi-x"></i>
       </span>
      }
      <div className="input-group mb-3">
        <input
          type="text"
          onChange={(e)=> setTerm(e.target.value)} 
          value={term}
          className="form-control"
          placeholder="نام محصول ..."
        />
        <button onClick={() => term !== '' && handleSearch()} className="input-group-text">
          <i className="bi bi-search"></i>
        </button>
      </div>
    </div>
  );
}

export default SearchSort;
