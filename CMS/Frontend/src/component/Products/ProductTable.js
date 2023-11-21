import React from 'react';
import { Link } from "react-router-dom";

const ProductTable = ({ data, bufferToBase64, handleDelete }) => {
  return (
    
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Collection</th>
          <th>Description</th>
          <th>Image</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((data, i) => (
          <tr key={i}>
            <td>{data.name}</td>
            <td>{data.collection}</td>
            <td>{data.description}</td>
            <td>
              {data.image && (
                <img
                  src={bufferToBase64(data.image)}
                  alt='Product Image'
                  style={{ width: '100px', height: '60px' }}
                />
              )}
            </td>
            <td>
              <button className='button'>
                <Link to={`/EditProduct/${data.id}`}>Edit</Link>
              </button>
              <button className='button' onClick={() => handleDelete(data.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
