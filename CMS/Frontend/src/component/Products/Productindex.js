import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom'
import ProductTable from './ProductTable';
import Sidebar from '../sidebar';
import Header from '../Header/Header';

import './table.css'


const Productindex = () => {
    const [product, setProduct] = useState([]);
    const [image, setImage] = useState(null)
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    useEffect(() => {
      axios.get('http://localhost:8082/Productindex')
        .then(res => setProduct(res.data))
        .catch(err => console.log(err));
    }, []);


    const totalPages = Math.ceil(product.length / itemsPerPage);

    const getPaginatedData = () => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      console.log(product[0])
      return product.slice(startIndex, endIndex);
    };
  
    const handlePageClick = (page) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    };
  
    const renderPageNumbers = () => {
      const pageNumbers = [];
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageClick(i)}
            className={currentPage === i ? 'active' : ''}
          >
            {i}
          </button>
        );
      }
    
      const ellipsis = <span key="ellipsis">...</span>;
    
      if (totalPages <= 3) {
        return pageNumbers;
      } else {
        if (currentPage <= 3) {
          // Show ellipsis on the right
          return [
            ...pageNumbers.slice(0, 3),
            totalPages > 3 ? ellipsis : null,
          ];
        } else if (currentPage >= totalPages - 1) {
          // Show ellipsis on the left
          return [
            totalPages > 3 ? ellipsis : null,
            ...pageNumbers.slice(totalPages - 3, totalPages),
          ];
        } else {
          // Show ellipsis on both sides
          return [
            ellipsis,
            ...pageNumbers.slice(currentPage - 1, currentPage + 2),
            ellipsis,
          ];
        }
      }
    };             
    const handleDelete = async (id) => {
        try {
          await axios.delete(`http://localhost:8082/Productindex/${id}`);
          window.location.reload()
        } catch (err) {
          console.log(err);
        }
      };
      const bufferToBase64 = (buffer) => {
        
        //console.log(buffer)
        return buffer;
      };
  return (
    <div >
      <div className='btnadd'>
      <button className="text-add">

      <Link to="/AddProduct" style={{ color: 'white' }}>Add</Link></button>
    </div>
    <ProductTable
        data={getPaginatedData()}
        bufferToBase64={bufferToBase64}
        handleDelete={handleDelete}
      />
      
    <div className='pagination'>
         
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        Next
      </button>
     
   
 
  </div>
  </div>
  
 
  );
  
}



export default Productindex
