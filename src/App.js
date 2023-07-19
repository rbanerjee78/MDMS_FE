import React, { lazy, Suspense, useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import NoPage from "./components/NoPage";
import Sidebar from "./components/Sidebar";
import { GoogleOAuthProvider } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import Login from "./components/Login";
import { Provider } from "react-redux";
import store from "./redux/store"; // Import the Redux store



const Home = lazy(() => import("./components/Home"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const EventDashboard = lazy(() => import("./components/EventDashboard"));
const AssetManagement = lazy(() => import("./components/AssetManagement"));
const ViewUsers = lazy(() => import("./components/ViewUsers"));
const MonthlyBilling = lazy(() => import("./components/MonthlyBilling"));
const VeeReport = lazy(() => import("./components/VeeReport"));
const DailyBilling = lazy(() => import("./components/DailyBilling"));
const CreateUser = lazy(() => import("./components/CreateUser"));
const CreateAsset = lazy(() => import("./components/CreateAsset"));
const LoadProfilePatterns = lazy(() => import("./components/LoadProfilePatterns"));
const NetMeteringBilling = lazy(() => import("./components/NetMeteringBilling"));
const DeviceProfiles = lazy(() => import("./components/DeviceProfiles"));
const CustomerDevices = lazy(() => import("./components/CustomerDevices"));
const TenantDevices = lazy(() => import("./components/TenantDevices"));
const Telemetry = lazy(() => import("./components/Telemetry"));




function App() {

  const API_KEY = "364474069693-uvs67jjv58ufjq0cadmftddl63k4mfvf.apps.googleusercontent.com";
  const [credentialResponse, setCredentialResponse] = useState(null);


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
  
  const [authToken, setAuthToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [loginresponse, setLoginResponse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
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

 

  const handleLogin = (authToken, refreshToken) => {
    setAuthToken(authToken);
    setRefreshToken(refreshToken);
    localStorage.setItem("authToken", authToken);
    localStorage.setItem("refreshToken", refreshToken);  
    if(authToken){
    setLoginResponse(true)
    }
    else
    {
      setLoginResponse(false)
    }
  };




  
 
 
  return (
    <Provider store={store}>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={API_KEY}>
        {!loginresponse ? (
                   
                   <Login handleLogin={handleLogin} />

        ) : (

          <div className="wrapper">
            <Sidebar />
            <div className="right-container bg-light">

              <Navbar handleClick={handleClick} isSidebarCollapsed={isSidebarCollapsed} username={loginresponse.username} />
              <Suspense fallback={<div className="d-flex justify-content-center mt-4"><div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div></div>}>
                <Routes>
                <Route path="/" element={<Home />} />
                  <Route exact path="/dashboard" element={<Dashboard />} />
                  <Route exact path="/eventdashboard" element={<EventDashboard />} />
                  <Route exact path="/assetmanagement" element={<AssetManagement />} />
                  <Route exact path="/viewusers" element={<ViewUsers />} />
                  <Route exact path="/monthlybilling" element={<MonthlyBilling />} />
                  <Route exact path="/veereport" element={<VeeReport />} />
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
    </Provider>
  );
}




export default App;
