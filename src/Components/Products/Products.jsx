import axios from 'axios';
import React from 'react';
import Product from '../Product/Product';
import { useQuery } from 'react-query';


export default function Products() {

  function getAllProducts() {
    return axios.get('https://route-ecommerce.onrender.com/api/v1/products')
  }

  const { data,isFetching, isLoading, refetch }= useQuery('products', getAllProducts,{
    cacheTime: 100000,
    staleTime:50000,
    refetchOnMount:true,
    refetchOnWindowFocus:true,
    enabled:false
    
  })
  console.log(data)
  console.log(isFetching, isLoading)


  return <>
      <button onClick={refetch}> Refetch</button>
    <div className="row">
      {data?.data?.data.map((product) => {
        return <div key={product.id} className="col-md-3">
          <Product product={product} />
        </div>
      })}
    </div>
  </>
}


