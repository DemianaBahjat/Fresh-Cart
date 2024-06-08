import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import CartProduct from '../CartProduct/CartProduct';
import Swal from 'sweetalert2'
import { Link} from 'react-router-dom';
import { CartContext } from '../../Contexts/CartContext';
import { useQuery } from 'react-query';
import Loading from '../Loading/Loading';
import { Helmet } from 'react-helmet';



export default function Cart() {

   const [cart, setCart] = useState({})
   const [timeOutId, setTimeOutId] = useState()
   const [cartId, setCartId]= useState()
   const {setCart: contextSetCart}= useContext(CartContext)
   const [isLoading, setIsLoading]= useState(false)

  async function getLoggedInCartProducts() {
    setIsLoading(true)
    try {
      const { data } = await axios.get('https://route-ecommerce.onrender.com/api/v1/cart', {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      setCartId(data.data._id)
      console.log(data);
      setCart(data)
      setIsLoading(false)
    } catch (error) {
      console.log(error);
    }
  }

  async function removeProductFromCart(productId) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then(async(result) => {
      if (result.isConfirmed) {
        const { data } = await axios.delete('https://route-ecommerce.onrender.com/api/v1/cart/' + productId, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        console.log(data);
        setCart(data);
        contextSetCart(data)
        
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your product has been deleted.",
          icon: "success"
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary product is safe :)",
          icon: "error"
        });
      }
    });
  }

   function clearCart() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then( async (result) => {
      if (result.isConfirmed) {
        const { data } = await axios.delete('https://route-ecommerce.onrender.com/api/v1/cart', {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        console.log(data);
        setCart(data);
        contextSetCart({})

         Swal.fire({
          title: "Deleted!",
          text: "Your Cart has been deleted.",
          icon: "success"
        });
      }
    });
  }

  useEffect(() => {
    getLoggedInCartProducts()
  }, [])

  function updateCartProductCount(productId, count) {
    clearTimeout(timeOutId)

    setTimeOutId(setTimeout(async () => {
      if (count == 0) {
        removeProductFromCart(productId)
      } else {
        const { data } = await axios.put('https://route-ecommerce.onrender.com/api/v1/cart/' + productId, {
          count
        }, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        console.log(data);
        setCart(data);
      }
    }, 500))
  }

  return <> 
            <Helmet>
                <meta charSet="utf-8" />
                <title>Fresh Cart | Cart</title>
            </Helmet>
  {isLoading ? <Loading/> : <h2> no product in your cart </h2>}
    {cart.data?.products.length > 0 ?

      <div className='my-5'>
      <button onClick={clearCart} className='btn btn-outline-danger d-block ms-auto'>Clear Cart</button>

      {cart.data?.products.map((cartProduct, index) => {
        return <CartProduct updateCartProductCount={updateCartProductCount} removeProductFromCart={removeProductFromCart} key={index} cartProduct={cartProduct} />
       })}

       <div className='d-flex justify-content-between'>
        <Link to={'/address/'+ cartId} className='btn bg-main text-white'>CheckOut</Link>
        <p>Total cart Price: {cart.data?.totalCartPrice} EGP</p>
      </div>

     </div>
      
      :
          <h2 className='alert alert-warning text-center my-5'>No products in your cart</h2>
      
    }

  </>
}
