import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import meterData from '../loadProfile.json';
import ReactPaginate from "react-paginate";



export default function LoadProfile() {

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 10;

  function handlePageClick(data) {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
  }

const offset = currentPage * itemsPerPage;
const paginatedData = searchResults.slice(offset, offset + itemsPerPage);

  const handleSearch = () => {
    const results = meterData.filter(meter =>
      meter.meterSerialNumber.toLowerCase().includes(searchTerm.toLowerCase()) &&
      new Date(meter.dateTime) >= startDate &&
      new Date(meter.dateTime) <= endDate
    );

    setSearchResults(results);
  }

 

 

  return (
    <div className='container my-3 '>
      <div className=" main-card py-3 px-3">
        <h5 className="fw-bold">Load Profile</h5>
        <div className='widget-card shadow-lg '>
          <div className='d-flex justify-content-start search-row'>
            <div className="mb-3 mx-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">Meter Serial No.</label>
              <input type="text" id="search" className="form-control" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

            </div>
            <div className="mb-3 mx-3 col-lg-2">
              <label htmlFor="exampleFormControlInput1" className="form-label">Start Date</label>
              <DatePicker type="text" className="form-control" placeholder="" selected={startDate} onChange={(date) => setStartDate(date)} >

              </DatePicker>
            </div>
            <div className="mb-3 mx-3 col-lg-2">
              <label htmlFor="exampleFormControlInput1" className="form-label">End Date</label>
              <DatePicker type="text" className="form-control" placeholder="" selected={endDate} onChange={(date) => setEndDate(date)} >

              </DatePicker>
            </div>
            <div className="mb-3 mx-3 d-grid">
              <button type='button' className='btn btn-primary ' style={{
                marginTop: "28px"
              }} onClick={handleSearch}>Submit</button>
            </div>
            <div className="mb-3 mx-3">
              <Popup
                trigger={<div className="menu-item" style={{
                  marginTop: "28px"
                }}> <button className='btn btn-outline-secondary'><FontAwesomeIcon icon={faEllipsisV}></FontAwesomeIcon></button> </div>}
                position="bottom left"
                on="click"
                closeOnDocumentClick
                mouseLeaveDelay={300}
                mouseEnterDelay={0}
                contentStyle={{ padding: '0px', border: 'none' }}
                arrow={false}
              >
                <div className="menu" >
                  <div className="menu-item"><label htmlFor='id'><input id='id' type="checkbox"></input> ID</label></div>
                  <div className="menu-item"> <label htmlFor='sno'><input id="sno" type="checkbox"></input> Meter Serial Number</label></div>
                  <div className="menu-item"><label htmlFor='date'><input id="date" type="checkbox"></input> Date/Time</label></div>
                  <div className="menu-item"><label htmlFor='freq'><input id="freq" type="checkbox"></input> Frequency</label></div>
                  <div className="menu-item"><label htmlFor='vrn'><input id="vrn" type="checkbox"></input> VoltageV_RN</label></div>
                  <div className="menu-item"><label htmlFor='vyn'><input id="vyn" type="checkbox"></input> VoltageV_YN</label></div>
                  <div className="menu-item"><label htmlFor='vbn'><input id="vbn" type="checkbox"></input> VoltageV_BN</label></div>
                  <div className="menu-item"><label htmlFor='activeimp'><input id="activeimp" type="checkbox"></input> Energy Active Import</label></div>
                  <div className="menu-item"><label htmlFor='activeexp'><input id="activeexp" type="checkbox"></input> Energy Active Export</label></div>
                  <div className="menu-item"><label htmlFor='netactive'><input id="netactive" type="checkbox"></input> Energy Net Active</label></div>
                </div>
              </Popup>
            </div>
          </div>
        </div>

        <div className="widget-card table-responsive shadow-lg ">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <td>Date/Time</td>
                <td>Frequency</td><td>VoltageV_RN</td><td>VoltageV_YN</td><td>VoltageV_BN</td>
                <td>Energy Active Import</td>
                <td>Energy Active Export</td>
                <td>Energy Net Active</td>

              </tr>
            </thead>
            <tbody>
              {paginatedData.map(meter => (
                <tr key={meter.dateTime}>
                  <td>{meter.meterSerialNumber}</td>
                  <td>{meter.dateTime}</td>
                  <td>{meter.frequency}</td>
                  <td>{meter.voltage_v_rn}</td>
                  <td>{meter.voltage_v_yn}</td>
                  <td>{meter.voltage_v_bn}</td>
                  <td>{meter.engy_active_import}</td>
                  <td>{meter.engy_netactive}</td>
                </tr>
 
              ))}
            </tbody>

          </table>

          <ReactPaginate
      previousLabel={'previous'}
      nextLabel={'next'}
      breakLabel={'...'}
      pageCount={Math.ceil(searchResults.length / itemsPerPage)}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={handlePageClick}
      containerClassName={'pagination'}
      activeClassName={'active'}
    />
     
        </div>
      </div>
    </div>
  )
}
