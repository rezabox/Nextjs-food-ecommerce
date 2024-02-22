'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react'

function PriceSort() {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  function handleChange(price) {
    const params = new URLSearchParams(searchParams);
    params.set('sortBy', price);
    params.delete('page');
    router.replace(`${pathName}?${params.toString()}`)
  }
  return (
    <div>
        <div>
              <label className="form-label">مرتب سازی</label>
              <div className="form-check my-2">
                <input
                  onChange={() => handleChange('max')}
                  checked={searchParams.has('sortBy') && searchParams.get('sortBy') === 'max'}
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                />
                <label className="form-check-label cursor-pointer">
                  بیشترین قیمت
                </label>
              </div>
              <div className="form-check my-2">
                <input
                  checked={searchParams.has('sortBy') && searchParams.get('sortBy') === 'min'}
                  onChange={() => handleChange('min')}
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                />
                <label className="form-check-label cursor-pointer">
                  کمترین قیمت
                </label>
              </div>
              <div className="form-check my-2">
                <input
                  onChange={() => handleChange('bestseller')}
                  checked={searchParams.has('sortBy') && searchParams.get('sortBy') === 'bestseller'}
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                />
                <label className="form-check-label cursor-pointer">
                  پرفروش ترین
                </label>
              </div>
              <div className="form-check my-2">
                <input
                  onChange={() => handleChange('sale')}
                  checked={searchParams.has('sortBy') && searchParams.get('sortBy') === 'sale'}
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                />
                <label className="form-check-label cursor-pointer">با تخفیف</label>
              </div>
            </div>
    </div>
  )
}

export default PriceSort
