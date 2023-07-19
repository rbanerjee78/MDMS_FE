import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";

const Navbar = (props) => {

  const [credentialResponse, setCredentialResponse] = useState(null);
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null);


  const logout = () => {
    setToken(null); // clear the token in the state
    localStorage.removeItem('authToken'); // remove the token from the browser's local storage
    localStorage.removeItem('refreshToken');
    window.location.href = '/'; // redirect the user to the login page
  }


 

  const userExists = userData && userData.find(user => user.email === props.email);



  return (

    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-lg p-3 bg-body ">

      <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav  mb-2 mb-lg-0" style={{ paddingLeft: "20px" }}>
          <li className="nav-item">
            <Link className="nav-link" to="/" style={{ paddingTop: "5px" }}>  <img src="../../assets/images/logo_black.svg" alt="logo" className="logo" /></Link>
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
        <ul className="navbar-nav ms-auto me-3">
        <li className="nav-item">
          <img src={props.picture ? props.picture : '../../assets/images/avatar.png'} alt="Profile" width="32" height="32" className="rounded-circle me-2" />
          </li>
          <li className="nav-item ">
            <Link to='/' className="nav-link" > {props.name}</Link>
          </li>
          <li className="nav-item ">
            <a href="/" className="nav-link" onClick={logout}>Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  )
}



export default Navbar;
