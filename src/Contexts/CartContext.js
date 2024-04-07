import axios from "axios";
import { createContext, useEffect, useState } from "react";



export const CartContext = createContext()



export default function CartContextProvider({ children }) {
    const [cart, setCart] = useState({})

    async function getLoggedInCartProducts() {
        try {
          const { data } = await axios.get('https://route-ecommerce.onrender.com/api/v1/cart', {
            headers: {
              token: localStorage.getItem('token')
            }
          })
          
    
          console.log(data);
          setCart(data)
        } catch (error) {
          console.log(error);
        }
      }

   useEffect( () =>{
    getLoggedInCartProducts()
   },[])
    return <CartContext.Provider value={{cart, setCart}}>
        {children}
    </CartContext.Provider>
}