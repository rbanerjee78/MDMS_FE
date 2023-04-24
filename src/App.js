import React, { lazy, Suspense, useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from "./components/NoPage";
import Sidebar from "./components/Sidebar";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { data } from "jquery";


const Home = lazy(() => import("./components/Home"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const EventDashboard = lazy(() => import("./components/EventDashboard"));
const AssetManagement = lazy(() => import("./components/AssetManagement"));
const ViewUsers = lazy(() => import("./components/ViewUsers"));
const MonthlyBilling = lazy(() => import("./components/MonthlyBilling"));
const DailyBilling = lazy(() => import("./components/DailyBilling"));
const CreateUser = lazy(() => import("./components/CreateUser"));
const CreateAsset = lazy(() => import("./components/CreateAsset"));
const LoadProfilePatterns = lazy(() => import("./components/LoadProfilePatterns"));
const NetMeteringBilling = lazy(() => import("./components/NetMeteringBilling"));
const DeviceProfiles = lazy(() =>import ("./components/DeviceProfiles"));
const CustomerDevices = lazy(()=> import( "./components/CustomerDevices"));
const TenantDevices = lazy(()=> import( "./components/TenantDevices"));
const Telemetry = lazy(()=> import( "./components/Telemetry"));




function App() {

  const API_KEY = "364474069693-uvs67jjv58ufjq0cadmftddl63k4mfvf.apps.googleusercontent.com";
  const [credentialResponse, setCredentialResponse] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");


  let responsePayload;
  if (credentialResponse) {
    // Decode credential response to get payload
    responsePayload = jwtDecode(credentialResponse.credential);

    // Add default role to payload
    responsePayload.role = "tenant";

    // Retrieve existing users from local storage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if users is an array before calling find method
    if (Array.isArray(users)) {
      // Find user with same email, if any
      const existingUser = users.find((user) => user.email === responsePayload.email);

      if (existingUser) {
        // Update existing user details
        Object.assign(existingUser, responsePayload);
      } else {
        // Add new user to existing users list
        users.push(responsePayload);
      }

      // Save updated users list to local storage
      //localStorage.setItem("users", JSON.stringify(users));
    } else {
      console.log("Users is not an array");
    }
  }




  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleClick = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
    console.log(isSidebarCollapsed)
  }


  //Login code
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authToken, setAuthToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);  
  const [loginresponse, setLoginResponse] = useState(null);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username.trim() === '' || password.trim() === '') {
      alert("Please enter a valid username and password.");
      return;
    }

    try {
      const response = await axios.post('https://localhost:1100/api/auth/login', {
        username,
        password,
      });

      const authsessionToken = localStorage.getItem("authToken");
      if (authsessionToken) {
        setLoginResponse(response);
      }

      if (response.data.status === 401) {
        // Handle 401 Unauthorized error here
        console.log('Unauthorized access');
        setErrorMessage("Invalid Username or Password");
        return;
      }

      const authToken = response.data.token;
      const refreshToken = response.data.refreshToken;
      setAuthToken(authToken); // set the token in the state
      setRefreshToken(refreshToken);
      localStorage.setItem('authToken', authToken); // store the token in the browser's local storage
      localStorage.setItem('refreshToken', refreshToken); // store the token in the browser's local storage  
      setLoginResponse(response);
     // console.log(response)

    } catch (error) {
      console.error(data)
      alert("Invalid username or password.");

    }
  };

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
   
    if (authToken) {
     console.log("Logged in")
     
      setLoginResponse({ data: { token: authToken } });
    
    } else {
      console.log("Logged out")
    }
  }, []);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay to demonstrate the loading screen
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-4"><div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div></div>
    );
  }


  //Login code ends

  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId={API_KEY}>
        {!loginresponse ? (
          <div className="loginBackground d-flex">
            <div className="loginSection text-center">
              <div className="loginForm shadow-lg">
                <img src="../../assets/images/logo_black.svg" className="img-fluid mb-4" alt="voltreum" />
                <h5>Sign In To Voltreum MDMS</h5>

                <form onSubmit={handleSubmit}>

                  {

                    errorMessage &&

                    <div className="alert alert-danger" role="alert">{errorMessage}</div>

                  }
                  <div className="form-group" style={{ textAlign: "left" }}>
                    <label htmlFor="username">Username:</label>
                    <input
                      className="form-control"
                      type="text"
                      id="username"
                      defaultValue={username}
                      onChange={handleUsernameChange}
                    />
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <label htmlFor="password">Password:</label>
                    <input
                      className="form-control"
                      type="password"
                      id="password"
                      defaultValue={password}
                      onChange={handlePasswordChange}
                    />

                    <div className="d-grid"><button type="submit" className=" btn btn-primary btn-md my-1">Login</button></div>
                  </div>

                </form>


                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    console.log(credentialResponse);
                  }}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                  text="signup_with"
                />


                <p style={{ color: "#000" }} className="px-5 py-3">By signing in you agree to our <span className="text-decoration-underline">Terms of Service</span></p>
              </div>
            </div>
          </div>
        ) : (

          <div className="wrapper">
            <Sidebar />
            <div className="right-container">

              <Navbar handleClick={handleClick} isSidebarCollapsed={isSidebarCollapsed} username={loginresponse.username} />
              <Suspense fallback={<div className="d-flex justify-content-center mt-4"><div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div></div>}>
                <Routes>
                  <Route exact path="/" element={<Home />} />
                  <Route exact path="/dashboard" element={<Dashboard />} />
                  <Route exact path="/eventdashboard" element={<EventDashboard />} />
                  <Route exact path="/assetmanagement" element={<AssetManagement />} />
                  <Route exact path="/viewusers" element={<ViewUsers />} />
                  <Route exact path="/monthlybilling" element={<MonthlyBilling />} />
                  <Route exact path="/dailybilling" element={<DailyBilling />} />
                  <Route exact path="/loadprofilepatterns" element={<LoadProfilePatterns />} />
                  <Route exact path="/netmeteringbilling" element={<NetMeteringBilling />} />
                  <Route exact path="/createuser" element={<CreateUser />} />
                  <Route exact path="/createasset" element={<CreateAsset />} />
                  <Route exact path="/devicemanagement" element={<DeviceProfiles />} />
                  <Route exact path="/customerdevices" element={<CustomerDevices />} />
                  <Route exact path="/tenantdevices" element={<TenantDevices />} />
                  <Route exact path="/telemetry" element={<Telemetry />} />


                  <Route exact path="*" element={<NoPage />} />
                </Routes>
              </Suspense>
            </div>
          </div>

        )}
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
}




export default App;
