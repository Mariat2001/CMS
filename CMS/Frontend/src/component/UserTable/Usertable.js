import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Usertable() {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    axios.get('http://localhost:8082/Usertable')
      .then(res => setUserData(res.data))
      .catch(err => console.log(err));
  }, []);

  const totalPages = Math.ceil(userData.length / itemsPerPage);

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return userData.slice(startIndex, endIndex);
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
        return [
          ...pageNumbers.slice(0, 3),
          totalPages > 3 ? ellipsis : null,
        ];
      } else if (currentPage >= totalPages - 1) {
        return [
          totalPages > 3 ? ellipsis : null,
          ...pageNumbers.slice(totalPages - 3, totalPages),
        ];
      } else {
        return [
          ellipsis,
          ...pageNumbers.slice(currentPage - 1, currentPage + 2),
          ellipsis,
        ];
      }
    }
  };

  return (
    <div className="responsive-table-container">
      <table className="responsive-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            
            <th>Phone</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {getPaginatedData().map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              
              <td>{user.phone}</td>
              <td>{user.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
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
