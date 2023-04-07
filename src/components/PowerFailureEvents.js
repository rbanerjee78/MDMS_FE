import React, { useState, useEffect } from "react";


export default function PowerFailureEvents() {

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
        // Import data from local file
        const importedData = require("../powerFailure.json");
        // Update state with imported data and set loading to false
        setData(importedData);
        setIsLoading(false);
      }, []);
  
    
  
    // Calculate pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  
    const renderData = () => {
        if (isLoading) {
          return <div>Loading...</div>;
        } else {
          return (
            <div className='container my-3 '>
      <div className=" main-card pt-3 px-3">
        <h5 className="fw-bold">Power Failure Events</h5>
        <div className='widget-card mb-4 shadow-lg '>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Meter Serial Number</th>
                  <th>Date Time</th>
                  <th>Event Code</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.meterSerialNumber}</td>
                    <td>{item.dateTime}</td>
                    <td>{item.eventCode}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div> 
            </div>
            </div>
          );
        }
      };
  
    const renderPagination = () => {
      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
        pageNumbers.push(i);
      }
  
      return (
        <nav>
          <ul className="pagination">
            {pageNumbers.map((number) => (
              <li key={number} className="page-item">
                <a
                  onClick={(e) => {
                    e.preventDefault(); // prevent the default behavior of the link
                    setCurrentPage(number);
                  }}
                  href="/"
                  className="page-link"
                >
                  {number}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      );
      
    };
  
    return (
      <div>
        {renderData()}
        {renderPagination()}
      </div>
    );
  
}
