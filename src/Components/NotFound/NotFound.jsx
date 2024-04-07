import React from 'react'
import notFoundImg from '../../Assets/images/error.svg'

export default function NotFound() {
    return (
        <div>
            <img className='w-50 m-auto d-block py-5' src={notFoundImg} alt="" />
        </div>
    )
}

 