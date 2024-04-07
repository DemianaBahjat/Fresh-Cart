import React, { useContext, useState } from 'react';
import logo from '../../Assets/images/freshcart-logo.svg'
import style from './Navbar.module.css'
import { Link, useNavigate ,  } from 'react-router-dom';
import { authContext } from '../../Contexts/AuthContext';
import { CartContext } from '../../Contexts/CartContext';

export default function Navbar() {
  
  const [pathname , setPathName] = useState(window.location.pathname)
  const { setUserIsLoggedIn, userIsLoggedIn } = useContext(authContext)
  const{cart}= useContext(CartContext)
  console.log(cart);
  const navigate = useNavigate()

  function logOut() {
    setUserIsLoggedIn(false)
    localStorage.removeItem('token')
    navigate('/login')
  }

  return <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link to={"home"} className="navbar-brand">
          <img src={logo} alt="fresh cart logo" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {userIsLoggedIn && <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to={'home'} onClick={() => { setPathName('home')}} className={ pathname == 'home' ? " bg-main rounded font-bold nav-link {`${style.nav-link}`}" : "nav-link"}> Home</Link>
            </li>
            <li className="nav-item">
            <Link to={'cart'} onClick={() => { setPathName('cart')}} className={ pathname == 'cart' ? " bg-main rounded nav-link" : "nav-link"}> Cart </Link>
            </li>

            <li className="nav-item">
            <Link to={'products'} onClick={() => { setPathName('products')}} className={ pathname == 'products' ? " bg-main rounded nav-link" : "nav-link"}> Products </Link>
            </li>

            <li className="nav-item">
            <Link to={'categories'} onClick={() => { setPathName('categories')}} className={ pathname == 'categories' ? " bg-main rounded nav-link" : "nav-link"}> Categories </Link>
            </li>

            <li className="nav-item">
            <Link to={'brands'} onClick={() => { setPathName('brands')}} className={ pathname == 'brands' ? " bg-main rounded nav-link" : "nav-link"}> Brands </Link>
            </li>

            <li className="nav-item">
            <Link to={'allorders'} onClick={() => { setPathName('allorders')}} className={ pathname == 'allorders' ? " bg-main rounded nav-link" : "nav-link"}> Orders </Link>
            </li>
          </ul>}

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <ul className="nav-item d-flex align-items-center">
            <Link to={'cart'}  className="fa-solid fa-cart-shopping fa-2x position-relative">
              <span className='position-absolute top-0 start-100 translate-middle bg-main p-2 rounded-circle font-sm'> {cart?.numOfCartItems || 0}</span>
            </Link>
              <i className='fab mx-2 fa-facebook'></i>
              <i className='fab mx-2 fa-twitter'></i>
              <i className='fab mx-2 fa-instagram'></i>
              <i className='fab mx-2 fa-youtube'></i>
              <i className='fab mx-2 fa-tiktok'></i>
            </ul>
            {userIsLoggedIn ?
              <li className="nav-item">
                <span onClick={logOut} className="nav-link cursor-pointer">Logout</span>
              </li>
              :
              <>
                <li className="nav-item">
                  <Link to={"login"} className="nav-link" >Login</Link>
                </li>
                <li className="nav-item">
                  <Link to={"register"} className="nav-link">Register</Link>
                </li>
              </>
            }
          </ul>
        </div>
      </div>
    </nav>
  </>
}
