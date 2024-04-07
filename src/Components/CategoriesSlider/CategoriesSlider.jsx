import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";

export default function CategoriesSlider() {

    const [categories, setCategories] = useState([])

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 7,
        arrows: false,
        autoplay:true,
        autoplaySpeed: 1500,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                infinite: true,
                dots: false
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            }
          ]
    };

    async function getAllCategories() {
        const { data } = await axios.get('https://route-ecommerce.onrender.com/api/v1/categories')
        setCategories(data.data);
    }

    useEffect(() => {
        getAllCategories()
    }, [])




    return (
        <Slider {...settings} >
            {categories.map((category, index) => {
                return <div key={index}>
                    <img style={{height: 200}} src={category.image} className='w-100' alt="" />
                    <h5>{category.name}</h5>
                </div>
            })}
        </Slider>
    )
}
