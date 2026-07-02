import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";
import DarkMode from "./DarkMode";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const Navbar = (props) => {

  const [credentialResponse, setCredentialResponse] = useState(null);
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null);
  const { isDarkMode } = props;


  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await signOut(auth);
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/';
    } catch (error) {
      console.error("Error signing out", error);
    }
  }

  const { currentUser } = props;
  const displayName = currentUser?.displayName || currentUser?.email?.split('@')[0] || 'User';
  const initials = displayName.substring(0, 2).toUpperCase();
  const photoURL = currentUser?.photoURL;

  return (

    <nav className="navbar navbar-expand-lg  shadow-lg p-3 ">

      <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="navbar-collapse d-flex w-100" id="navbarSupportedContent">
        <ul className="navbar-nav  mb-2 mb-lg-0" style={{ paddingLeft: "20px" }}>
          <li className="nav-item">
            <Link className="nav-link" to="/" style={{ paddingTop: "5px" }}> 
        
                      
          {isDarkMode ? (
        <img src='../../assets/images/logo_white.svg' alt="logo" className="logo" /> 
      ) : (
        <img src='../../assets/images/logo_black.svg' alt="logo" className="logo" /> 
      )}
             </Link>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/dashboard">360 Dashboard</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/eventdashboard">Event Dashboard</NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/viewusers">User Management</NavLink>
          </li>

          <li className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
             Devices
            </Link>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link className="dropdown-item" to="/tenantdevices">Tenant Devices</Link>
            
            </div>
          </li>


          <li className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Billing  Reports
            </Link>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link className="dropdown-item" to="/monthlybilling">Monthly Billing Report</Link>
              <Link className="dropdown-item" to="/dailybilling">Daily Billing Report</Link>
              <Link className="dropdown-item" to="/loadprofilepatterns">Load Profile and Load Patterns</Link>
              <Link className="dropdown-item" to="/netmeteringbilling">Net Metering Patterns</Link>
            </div>
          </li>

          
          <li className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Vee Reports
            </Link>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link className="dropdown-item" to="/veereport">Profile wise check failure Reports</Link>
                   </div>
          </li>

          <li className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Exceptions
            </Link>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link className="dropdown-item" href="/">TOU Validation Report</Link>
              <Link className="dropdown-item" href="/">Energy Loss Report</Link>
              <Link className="dropdown-item" href="/">Unidentified Meters</Link>
              <Link className="dropdown-item" href="/">Billing Estimation</Link>
              <Link className="dropdown-item" href="/">Missing Intervals</Link>
              <Link className="dropdown-item" href="/">High Usage Report</Link>
              <Link className="dropdown-item" href="/">Meter Change Report</Link>
              <Link className="dropdown-item" href="/">Suspected & Defective Meter Report</Link>
              <Link className="dropdown-item" href="/">Load violation report</Link>

            </div>
          </li>




        </ul>
        <div className="d-flex align-items-center ms-auto me-3 space-x-4">
          <div className="me-4 mt-2">
            <DarkMode isDarkMode={props.isDarkMode} setIsDarkMode={props.setIsDarkMode} />
          </div>
          
          {/* Mockup icons for notifications and messages */}
          <div className="d-flex align-items-center me-4 space-x-3">
            <button className="btn btn-light rounded-circle p-2 position-relative shadow-sm" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-secondary"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"></span>
            </button>
            <button className="btn btn-light rounded-circle p-2 position-relative shadow-sm" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '10px' }}>
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-success"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
              <span className="position-absolute top-0 start-100 translate-middle p-1 bg-success border border-light rounded-circle"></span>
            </button>
          </div>

          <div className="dropdown">
            <button className="btn btn-light rounded-pill p-1 shadow-sm d-flex align-items-center dropdown-toggle" type="button" id="userMenuButton" data-bs-toggle="dropdown" aria-expanded="false" style={{ paddingRight: '12px' }}>
              {photoURL ? (
                <img src={photoURL} alt="Profile" className="rounded-circle me-2" style={{ width: '36px', height: '36px', objectFit: 'cover' }} />
              ) : (
                <div className="rounded-circle me-2 d-flex align-items-center justify-content-center text-white font-weight-bold" style={{ width: '36px', height: '36px', backgroundColor: '#a855f7', fontSize: '14px' }}>
                  {initials}
                </div>
              )}
              <div className="text-start me-2 d-none d-lg-block" style={{ lineHeight: '1.2' }}>
                <div className="fw-bold text-dark" style={{ fontSize: '14px' }}>{displayName}</div>
                <div className="text-muted" style={{ fontSize: '11px' }}>Grid Operator</div>
              </div>
            </button>
            <ul className="dropdown-menu dropdown-menu-end shadow" aria-labelledby="userMenuButton">
              <li><button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}



export default Navbar;
