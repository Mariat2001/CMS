import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link, useNavigate,useLocation, useParams} from 'react-router-dom'

const EditProduct = ({}) => {
  const [image, setImage] = useState(null);
  const [error,setError] = useState(false)
  const [product, setProduct] = useState({
    name: "",
    collection: "",
    description: "",
    image: "",
  });
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const handleChange = (e) => {
    setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const navigate = useNavigate();

  
  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8082/EditProduct/${id}`, product);
      navigate('/Productindex');
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
   }

   const clearImage = () => {
    setImage(""); 
  };


  return (
    <form >
      <h2>Update</h2>
    <input
      type="text"
      name="name"
      placeholder="Enter Name"
    
      onChange={handleChange}
    />
    <input
      type="text"
      name="collection"
      placeholder="Enter collection"
     
      onChange={handleChange}
    />
    <input
      type="text"
      name="description"
      placeholder="Enter description"
    
      onChange={handleChange}
    />
    {/* <input
      type="text"
      name="image"
      placeholder="Enter email"
  
      onChange={handleChange}
    /> */}
     <div>
    <input type="file" onChange={onImageChange} className="filetype" />
    <img alt="preview image" src={image}/>
    {image && (
        <button onClick={clearImage}>Clear Image</button>
      )}
  </div>
   <button onClick={handleClick}>Update</button>
  </form>
  );
};

export default EditProduct;