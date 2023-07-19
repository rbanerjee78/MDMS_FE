import React, { useState } from "react";
import { connect } from "react-redux";
import { loginSuccess, loginFailure } from "../redux/actions/authActions";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";

const Login = ({ handleLogin, dispatchLoginSuccess, dispatchLoginFailure })  => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const API_KEY = "364474069693-uvs67jjv58ufjq0cadmftddl63k4mfvf.apps.googleusercontent.com";

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username.trim() === "" || password.trim() === "") {
      alert("Please enter a valid username and password.");
      return;
    }

    try {
      const response = await axios.post("https://localhost:1100/api/auth/login", {
        username,
        password,
      });

      if (response.data.status === 401) {
        // Handle 401 Unauthorized error here
        console.log("Unauthorized access");
        setErrorMessage("Invalid Username or Password");
        return;
      }

      const authToken = response.data.token;
      const refreshToken = response.data.refreshToken;
      handleLogin(authToken, refreshToken);
    } catch (error) {
      console.error(error);
      alert("Invalid username or password.");
    }
  };




  return (
    <div className="loginBackground d-flex">
      <div className="loginSection text-center">
        <div className="loginForm shadow-lg">
          <img src="../../assets/images/logo_black.svg" className="img-fluid mb-4" alt="voltreum" />
          <h5>Sign In To Voltreum MDMS</h5>

          <form onSubmit={handleSubmit}>
            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}
            <div className="form-group" style={{ textAlign: "left" }}>
              <label htmlFor="username">Username:</label>
              <input
                className="form-control"
                type="text"
                id="username"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <div style={{ textAlign: "left" }}>
              <label htmlFor="password">Password:</label>
              <input
                className="form-control"
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
              />

              <div className="d-grid">
                <button type="submit" className="btn btn-primary btn-md my-1">
                  Login
                </button>
              </div>
            </div>
          </form>

          <GoogleLogin
            clientId={API_KEY} // Replace with your Google OAuth client ID
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
            buttonText="Sign in with Google"
          />

          <p style={{ color: "#000" }} className="px-5 py-3">
            By signing in you agree to our{" "}
            <span className="text-decoration-underline">Terms of Service</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { loginSuccess, loginFailure })(Login);
