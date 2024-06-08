import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ImageDisplay = () => {
  const [imageUrl, setImageUrl] = useState('');

  const fetchImage = async () => {
    try {
      const response = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
      
      // Assuming the response data is an array of products and we want to display the image of the first product
      const firstProduct = response.data[0];
      const image = firstProduct.image; // Assuming the image URL is in the 'image' field of the product object

      setImageUrl(image); // Set the image URL

      // Display image using SweetAlert2
      Swal.fire({
        title: 'Product Image',
        html: <img src={`${image}`} alt="Product Image" style={{maxWidth: '100%'}} />,
        showCloseButton: true,
        showConfirmButton: false
      })
      
    }catch (error) {
      console.error('Error fetching image:', error);
    }
  }

  return (
    <div>
      <button onClick={fetchImage}>Show Image</button>
    </div>
  );
};

export default ImageDisplay;