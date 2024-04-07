import React from 'react'
import style from './Footer.module.css'
import amazon from '../../Assets/images/amazon.png'
import masterCard from '../../Assets/images/masterCard.jpg'
import payPal from '../../Assets/images/PayPal.png'
import appStore from '../../Assets/images/button-available.png'
import googlePlay from '../../Assets/images/button-googleplay.png'

function Footer() {
    return (
        <footer className="bg-main-light  py-5">
            <div className="container">
                <h4>Get the Frech Cart App</h4>
                <p>We will send you a link, ioen it on your phone to download the app.</p>
                <div className="d-flex">
                    <div className="col-sm-10">
                        <input type="text" className="form-control py-2" placeholder="Email..." />
                    </div>
                    <div className="col-sm-2 ps-3">
                        <button className="btn w-100 bg-main text-white">Share App Link</button>
                    </div>
                </div>
                <div className="line border-bottom border-2 my-4">
                </div>
                <div className='d-flex'>
                    
                    <p > Payment patterns</p>
                    <div className='image'>
                    <img src={amazon} className={`${style.image__width} ms-2`} alt="logo amazon" />
                    <img src={payPal} className={`${style.image__width} ms-2` } alt='logo payPal'/>
                    <img src={masterCard} className={`${style.image__width} ms-2`} alt="logo masterCard" />

                    </div>

                    <div className='ms-auto'>
                    <p > Get delivers with FreshCart</p>
                    
                        <img src={appStore} className={`${style.image__width} ms-2`} alt="logo appStore" />
                        <img src={googlePlay} className={`${style.image__width} ms-2`} alt="logo googlePlay" />

                    

                    </div>
                   
                </div>
            </div>
        </footer>
    )
}

export default Footer