'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react'

function CategoriesList({categories}) {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  function handleClick(id){
    const params = new URLSearchParams(searchParams);
    params.set('category', id);
    params.delete('page');
    router.replace(`${pathName}?${params.toString()}`)
  }
  return (
    <div className="filter-list">
    <div className="form-label">دسته بندی</div>
    <ul>
      {categories.map(category =>(
        <li key={category.id} className={searchParams.has('category') && searchParams.get('category') == category.id ? "my-2 filter-list-active cursor-pointer" : "my-2 cursor-pointer"} onClick={() => handleClick(category.id)}>{category.name}</li>
      ))}
    </ul>
  </div>
  )
}

export default CategoriesList;
