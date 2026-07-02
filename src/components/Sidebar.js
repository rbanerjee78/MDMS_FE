import React, { useState } from 'react';
import { 
  faArrowAltCircleRight, faChartLine, faBars, 
  faMicrochip, faBroadcastTower, faCubes, faNetworkWired, 
  faLayerGroup, faChartPie, faClipboardCheck, faTachometerAlt, 
  faCreditCard, faWrench 
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';


export default function Sidebar(props) {
  

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleClick = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
    console.log(isSidebarCollapsed)
  }

  const sidebarClass = isSidebarCollapsed ? "close" : "open";





  return (

    

      <div className={`d-flex flex-column bg-violet ${sidebarClass} p-3 sidebar`}  >
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
              <FontAwesomeIcon icon={faChartLine} style={{ width: '20px' }} /> {isSidebarCollapsed ? '' : 'Dashboard'}
            </Link>
          </li>
          <li className='text-left text-truncate'>
            <Link to="/devicemanagement" className="nav-link link-dark  ps-2">
              <FontAwesomeIcon icon={faMicrochip} style={{ width: '20px' }} /> {isSidebarCollapsed ? '' : 'Device Profiles'}
            </Link>
          </li>
          <li className='text-left text-truncate'>
            <Link to="/telemetry" className="nav-link link-dark  ps-2">
              <FontAwesomeIcon icon={faBroadcastTower} style={{ width: '20px' }} /> {isSidebarCollapsed ? '' : 'Telemetry Data'}
            </Link>
          </li>
           <li className='text-left text-truncate'>
            <Link to="/assetmanagement" className="nav-link link-dark  ps-2">
              <FontAwesomeIcon icon={faCubes} style={{ width: '20px' }} /> {isSidebarCollapsed ? '' : 'Asset Management'}
            </Link>
          </li>
          <li className='text-left text-truncate'>
            <Link to="/comms-data" className="nav-link link-dark ps-2">
              <FontAwesomeIcon icon={faNetworkWired} style={{ width: '20px' }} />   {isSidebarCollapsed ? '' : 'Comms & Data'}
            </Link>
          </li>
          <li className='text-left text-truncate'>
            <Link to="/aggregation" className="nav-link link-dark ps-2">
              <FontAwesomeIcon icon={faLayerGroup} style={{ width: '20px' }} /> {isSidebarCollapsed ? '' : 'Aggregation'}
            </Link>
          </li>
          <li className='text-left text-truncate'>
            <Link to="/consumption-analysis" className="nav-link link-dark ps-2">
              <FontAwesomeIcon icon={faChartPie} style={{ width: '20px' }} /> {isSidebarCollapsed ? '' : 'Consumption Analysis'}
            </Link>
          </li>

         

          <li className='text-left text-truncate'>
            <Link to="/veereport" className="nav-link link-dark ps-2">
              <FontAwesomeIcon icon={faClipboardCheck} style={{ width: '20px' }} /> {isSidebarCollapsed ? '' : 'VEE'}
            </Link>
          </li>
          <li className="text-left text-truncate">
            <Link className="nav-link link-dark ps-2"  to="/performance-factors">
            <FontAwesomeIcon icon={faTachometerAlt} style={{ width: '20px' }} /> {isSidebarCollapsed ? '' : 'Performance Factors'}
            </Link>
          </li>
          <li className="text-left text-truncate">
            <Link className="nav-link link-dark ps-2"  to="/prepaid">
            <FontAwesomeIcon icon={faCreditCard} style={{ width: '20px' }} /> {isSidebarCollapsed ? '' : 'Prepaid'}
            </Link>
          </li>

          <li className="text-left text-truncate">
            <Link className="nav-link link-dark ps-2"  to="/service-orders">
            <FontAwesomeIcon icon={faWrench} style={{ width: '20px' }} /> {isSidebarCollapsed ? '' : 'Service Orders'}
            </Link>
          </li>

        
        

        </ul>
     
      </div>



    
  )
}
