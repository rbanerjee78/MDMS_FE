import React, { useState } from 'react';
import { faArrowAltCircleRight, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faBars } from "@fortawesome/free-solid-svg-icons";


export default function Sidebar(props) {
  

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleClick = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
    console.log(isSidebarCollapsed)
  }

  const sidebarClass = isSidebarCollapsed ? "close" : "open";





  return (

    

      <div className={`d-flex flex-column  bg-violet  ${sidebarClass} shadow-lg p-3  bg-body  sidebar`}  >
        <div className='d-flex justify-content-end'>
          <button onClick={handleClick} style={{ background: "transparent", border: "none", color: "#ffffff" }}>
          
          <FontAwesomeIcon icon={faBars}></FontAwesomeIcon></button>
         
        
        </div>
    {/*     {isSidebarCollapsed ? (
    ''
        ) : (
          <Link
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
          to="/"
          style={{ paddingLeft: "15px", paddingTop: "15px" }}
        >
          <img
            src="../../assets/images/logo_white.svg"
            alt="Headend"
            className="img-fluid logo"
          />
        </Link>
        )}
 */}
        <hr />
        <ul className={`nav ${isSidebarCollapsed ? '' : 'nav-pills'} flex-column mb-auto`}>
          <li className='text-left text-truncate'>
            <Link to="/dashboard" className="nav-link link-dark  ps-2">
              <FontAwesomeIcon icon={faChartLine} /> {isSidebarCollapsed ? '' : 'Dashboard'}
            </Link>
          </li>
           <li className='text-left text-truncate'>
            <Link to="/assetmanagement" className="nav-link link-dark  ps-2">
              <FontAwesomeIcon icon={faArrowAltCircleRight} /> {isSidebarCollapsed ? '' : 'Asset Management'}
            </Link>
          </li>
          <li className='text-left text-truncate'>
            <Link to="/" className="nav-link link-dark ps-2">
              <FontAwesomeIcon icon={faArrowAltCircleRight} />   {isSidebarCollapsed ? '' : 'Comms & Data'}
            </Link>
          </li>
          <li className='text-left text-truncate'>
            <Link to="/" className="nav-link link-dark ps-2">
              <FontAwesomeIcon icon={faArrowAltCircleRight} /> {isSidebarCollapsed ? '' : 'Aggregation'}
            </Link>
          </li>
          <li className='text-left text-truncate'>
            <Link to="/" className="nav-link link-dark ps-2">
              <FontAwesomeIcon icon={faArrowAltCircleRight} /> {isSidebarCollapsed ? '' : 'Consumption Analysis'}
            </Link>
          </li>

         

          <li className='text-left text-truncate'>
            <Link to="/" className="nav-link link-dark ps-2">
              <FontAwesomeIcon icon={faArrowAltCircleRight} /> {isSidebarCollapsed ? '' : 'VEE'}
            </Link>
          </li>
          <li className="text-left text-truncate">
            <Link className="nav-link link-dark ps-2"  to="/">
            <FontAwesomeIcon icon={faArrowAltCircleRight} /> {isSidebarCollapsed ? '' : 'Performance Factors'}
            </Link>
          </li>
          <li className="text-left text-truncate">
            <Link className="nav-link link-dark ps-2"  to="/">
            <FontAwesomeIcon icon={faArrowAltCircleRight} /> {isSidebarCollapsed ? '' : 'Prepaid'}
            </Link>
          </li>

          <li className="text-left text-truncate">
            <Link className="nav-link link-dark ps-2"  to="/">
            <FontAwesomeIcon icon={faArrowAltCircleRight} /> {isSidebarCollapsed ? '' : 'Service Orders'}
            </Link>
          </li>

        
        

        </ul>
     
      </div>



    
  )
}
