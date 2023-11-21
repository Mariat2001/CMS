import React, { useState } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom'
import './Addproduct.css'


const AddProduct = ({ addNewProduct }) => {
  const [name, setName] = useState('');
  const [collection, setCollection] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  
  
  const onImageChange = (e) => {
    const file = e.target.files[0]; // Get the first selected file

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const base64Image = event.target.result.split(',')[1]; // Get the base64 data (remove data:image/png;base64,)
        console.log(base64Image)
        // Save the base64 image to the 'image' state variable
        setImage(base64Image);
      };

      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };
   const clearImage = () => {
    setImage(""); 
  };
  const navigate = useNavigate();

 

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Image data:", image);
    axios
      .post('http://localhost:8082/AddProduct', { name, collection, description, image },
     )
    
    
      .then((res) => {
        console.log(res);
        navigate('/Productindex');
      })
      .catch((err) => {
        console.log(err);
      });
  };


    return(
        <form className='form' onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
        
          onChange={e =>setName(e.target.value)}
        />
        <input
          type="text"
          name="collection"
          placeholder="Enter collection"
         
          onChange={e =>setCollection(e.target.value)}
        />
        <input
          type="text"
          name="description"
          placeholder="Enter description"
        
          onChange={e =>setDescription(e.target.value)}
        />
        {/* <input
          type="text"
          name="image"
          placeholder="Enter email"
      
          onChange={e =>setImage(e.target.value)}
        /> */}

      <div>
        <input type="file" onChange={onImageChange} className="filetype custom-file-input" />
        <div className='image-container'>
          <img alt="preview image" src={ `data:image/png;base64,${image}`} />
        </div>
      </div>
        <button type="submit">Add</button>
      </form>
    )
  
}

export default AddProduct
