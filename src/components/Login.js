import React, { useState } from "react";
import { connect } from "react-redux";
import { loginSuccess, loginFailure } from "../redux/actions/authActions";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState("demo@voltreum.com");
  const [password, setPassword] = useState("123456");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleEmailLogin = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    if (username.trim() === "" || password.trim() === "") {
      setErrorMessage("Please enter a valid username/email and password.");
      return;
    }

    setIsSubmitting(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      const token = await userCredential.user.getIdToken();
      if (handleLogin) handleLogin(token, token); // Just to preserve prop functionality
      navigate("/"); // Redirect to dashboard
    } catch (error) {
      console.error(error);
      setErrorMessage("Invalid credentials or user not found.");
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMessage("");
    setIsSubmitting(true);
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const token = await userCredential.user.getIdToken();
      if (handleLogin) handleLogin(token, token);
      navigate("/"); // Redirect to dashboard
    } catch (error) {
      console.error(error);
      setErrorMessage("Google Sign-In failed.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans relative">
      {isSubmitting && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/40 backdrop-blur-md">
          <div className="premium-ring"></div>
          <div className="premium-loader-text text-gray-800">Authenticating...</div>
        </div>
      )}
      
      {/* Left Pane - Branding & Gradient */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between login-gradient p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center space-x-2 mb-16">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-purple-600 font-bold text-xl">
              ⚡
            </div>
            <span className="text-2xl font-bold tracking-tight">Voltreum</span>
          </div>

          <div className="inline-block px-3 py-1 mb-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-xs font-semibold uppercase tracking-widest text-green-300">
            <span className="inline-block w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></span>
            MDMS v4.2 • Live
          </div>

          <h1 className="text-5xl font-extrabold leading-tight mb-6">
            The operating system<br />for renewable <span className="text-purple-200">grids.</span>
          </h1>

          <p className="text-lg text-white/80 max-w-md mb-12">
            Ingest, validate and act on millions of smart meter readings — with the precision your utility demands.
          </p>

          <div className="flex space-x-4">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-xl flex-1">
              <div className="text-3xl font-bold mb-1">2.4M</div>
              <div className="text-sm text-white/70">Endpoints</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-xl flex-1">
              <div className="text-3xl font-bold mb-1">99.98%</div>
              <div className="text-sm text-white/70">Uptime</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-xl flex-1">
              <div className="text-3xl font-bold mb-1">&lt;200ms</div>
              <div className="text-sm text-white/70">Read latency</div>
            </div>
          </div>
        </div>
        
        <div className="relative z-10 flex space-x-6 text-sm text-white/60 font-medium">
          <span className="flex items-center"><svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg> ISO 27001</span>
          <span className="flex items-center"><svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg> SOC 2 Type II</span>
          <span className="flex items-center"><svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> IEC 61968</span>
        </div>
      </div>

      {/* Right Pane - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
            <p className="text-gray-500">Sign in to your operations console to continue.</p>
          </div>

          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm font-medium border border-red-100">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleEmailLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2" htmlFor="username">
                Username / Email
              </label>
              <input
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                type="text"
                id="username"
                value={username}
                onChange={handleUsernameChange}
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide" htmlFor="password">
                  Password
                </label>
                <a href="#" className="text-xs font-semibold text-purple-600 hover:text-purple-800 transition-colors">Forgot?</a>
              </div>
              <div className="relative">
                <input
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all pr-12"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-purple-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.978 9.978 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember_me"
                type="checkbox"
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded cursor-pointer"
              />
              <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                Keep me signed in on this device
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold py-3 px-4 rounded-xl hover:from-purple-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all shadow-md flex justify-center items-center group"
            >
              Sign in to console
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>

          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-400 text-xs uppercase tracking-widest font-semibold">Or</span>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={handleGoogleLogin}
              className="w-full bg-white border border-gray-300 text-gray-700 font-bold py-3 px-4 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-all flex justify-center items-center shadow-sm"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5 mr-3" alt="Google logo" />
              Enterprise Single Sign-On
            </button>
          </div>

          <div className="mt-12 text-center text-xs text-gray-500">
            Protected by Voltreum Identity · <a href="#" className="text-purple-600 hover:underline">Status</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { loginSuccess, loginFailure })(Login);
