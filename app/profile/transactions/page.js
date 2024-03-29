
import Loading from '@/components/menuProduct/Loading';
import OrdersPage from '@/components/profile/addressess/transactions/page'
import React, { Suspense } from 'react'

function tableOrder({ searchParams }) {
  const params = new URLSearchParams(searchParams);

  return (
    <div>
      <Suspense key={params.toString()} fallback={<Loading/>}>
      <OrdersPage params={params.toString()}/>  
      </Suspense>  
    </div>
  )
}
export default tableOrder;
