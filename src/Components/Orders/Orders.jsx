import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Loading from './../Loading/Loading';

export default function Orders() {
  const [order, setOrder]= useState([])
  const [loading , setLoading] = useState(false)

  async function getAllOrders(id){
    setLoading(true)
    const {data}= await axios.get('https://ecommerce.routemisr.com/api/v1/orders/user/' + id)
    console.log(data)
    setOrder(data)
    setLoading(false)
  }

  useEffect( () => {
    const {id}= jwtDecode(localStorage.getItem('token'))
    getAllOrders(id)
  }, [])
  return (
    <>
      {loading? <Loading/> : null}
      <h1>Your Orders :</h1>
      {order.map( (order) => {
        return <div  className="row"   key={order.id}>
       <div className='shadow rounded p-4 my-5'>

       <div className='d-flex align-items-center'>
       <h2 className='fw-bolder'>#{order.id}</h2>
       <h4 className='fw-bold text-primary mx-3'> processing </h4>
       </div>

       <p>You have ordered {order.cartItems.length} items.</p>
       
       <div className='d-flex'>
       {order.cartItems.map((item) => {
        return <img src={item.product.imageCover} style={{width:150}} className='img-thumbnail mx-1' key={item._id}/>
       })}
       </div>
       <hr/>
       <p><strong>Total amount:</strong>{order.totalOrderPrice} EGP</p>
       </div>
        </div>
      })}
    </>
  )
}
