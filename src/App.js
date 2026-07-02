import React, { lazy, Suspense, useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import NoPage from "./components/NoPage";
import Sidebar from "./components/Sidebar";
import jwtDecode from "jwt-decode";
import DarkMode from "./components/DarkMode";
// removed static Login import
import { Provider } from "react-redux";
import store from "./redux/store"; // Import the Redux store
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import useIdleTimeout from "./hooks/useIdleTimeout";


const Login = lazy(() => import("./components/Login"));
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
const CreateDevice = lazy(() => import("./components/CreateDevice"));
const CreateProfile = lazy(() => import("./components/CreateProfile"));
const Aggregation = lazy(() => import("./components/Aggregation"));
const CommsData = lazy(() => import("./components/CommsData"));
const ConsumptionAnalysis = lazy(() => import("./components/ConsumptionAnalysis"));
const PerformanceFactors = lazy(() => import("./components/PerformanceFactors"));
const Prepaid = lazy(() => import("./components/Prepaid"));
const ServiceOrders = lazy(() => import("./components/ServiceOrders"));
function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);


  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }, [isDarkMode]);

  const handleClick = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
    console.log(isSidebarCollapsed)
  }

  //Login code
  
  const [authToken, setAuthToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [loginresponse, setLoginResponse] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  // Auto-logout after 15 minutes of inactivity
  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      setAuthToken(null);
      setRefreshToken(null);
      setLoginResponse(false);
      console.log("Session expired due to inactivity");
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  useIdleTimeout(handleLogout, 15);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setLoginResponse(true);
      } else {
        setCurrentUser(null);
        setLoginResponse(false);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="premium-loader-container" style={{ height: '100vh' }}>
        <div className="premium-ring"></div>
        <div className="premium-loader-text">Loading MDMS</div>
      </div>
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
        {!loginresponse ? (
                   
                   <Login handleLogin={handleLogin} />

        ) : (

          <div className="wrapper">
            <Sidebar />
            <div className="right-container ">
            

              <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} handleClick={handleClick} isSidebarCollapsed={isSidebarCollapsed} currentUser={currentUser} />
              <Suspense fallback={<div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '70vh' }}>
                <div className="premium-ring" style={{ width: '40px', height: '40px' }}></div>
                <div className="premium-loader-text" style={{ fontSize: '13px' }}>Loading...</div>
              </div>}>
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
                  <Route exact path="/createdevice" element={<CreateDevice />} />
                  <Route exact path="/createprofile" element={<CreateProfile />} />
                  <Route exact path="/telemetry" element={<Telemetry />} />
                  <Route exact path="/aggregation" element={<Aggregation />} />
                  <Route exact path="/comms-data" element={<CommsData />} />
                  <Route exact path="/consumption-analysis" element={<ConsumptionAnalysis />} />
                  <Route exact path="/performance-factors" element={<PerformanceFactors />} />
                  <Route exact path="/prepaid" element={<Prepaid />} />
                  <Route exact path="/service-orders" element={<ServiceOrders />} />

                  <Route exact path="*" element={<NoPage />} />
                </Routes>
              </Suspense>
            </div>
          </div>

        )}
    </BrowserRouter>
    </Provider>
  );
}




export default App;
