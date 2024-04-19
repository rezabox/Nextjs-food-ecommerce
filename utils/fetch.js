const getFetch = async (url,headers={}) => {
     const res = await fetch(`${process.env.API_URL}${url}`, {
         cache: 'no-store',
         headers: {
             'Content-Type': 'application/json',
             'Accept': 'application/json',
             ...headers,
         }
     });
     if(res.ok) {
       const data = await res.json();
       return data.data
     } else {
          throw new Error(`مشکل در دریافت اطلاعات کد :${res.status}`);
     }
}

const postFetch = async (url,body,headers={}) => {
  const res = await fetch(`${process.env.API_URL}${url}`, {
      cache: 'no-store',
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...headers,
      },
      body: JSON.stringify(body)
  });
   return await res.json();
}

export { getFetch,postFetch }