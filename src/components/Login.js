import React, { useState, useEffect } from "react";
import "./Login.css";
import google from "../assets/google-icon.png";
import apple from "../assets/apple.png";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError(""); // Clear the error message when the email input changes
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError(""); // Clear the error message when the password input changes
  };

  const handleSignIn = () => {
    const validEmail = "user@example.com";
    const validPassword = "password";

    if (email === validEmail && password === validPassword) {
      navigate("/dashboard");
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };
  return (
    <div className="main-class">
      <div className="boxe left-box">
        <div className="top-left-text">
          <div className="logo-text">LOGO</div>
        </div>
        <div className="centered-text">Board.</div>
        <div className="icon-container">
          <i class="fab fa-github"></i>
          <i class="fab fa-twitter"></i>
          <i class="fab fa-linkedin"></i>
          <i class="fab fa-discord"></i>
        </div>
        <div class="box-container"></div>
      </div>
      <div className="boxe right-box">
        <h2 className="mobile-board-heading">BOARD.</h2>
        <div>
          <div className="sign-in-text">
            <h2>Sign In</h2>
            <h6>Sign in to your account</h6>
          </div>
          <div className="holder">
            <div className="social-accounts">
              <div className="icon1">
                <GoogleOAuthProvider clientId="431866389084-cnukookc8b9mldjpteaig7fva1aieiis.apps.googleusercontent.com">
                  <GoogleLogin
                    id="custom-google-login"
                    onSuccess={(credentialResponse) => {
                      var decoded = jwt_decode(credentialResponse.credential);
                      console.log(decoded);
                      navigate("/dashboard");
                    }}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                  />
                </GoogleOAuthProvider>
              </div>
              <div className="icon1">
                <button className="btn">
                  <img className="ic1" src={apple} />
                  Sign in with apple
                </button>
              </div>
            </div>
            <div class="login-container">
              <form>
                <div class="input-container">
                  <div>
                    {" "}
                    <label for="username">
                      <h4 className="labelss">Email address</h4>
                    </label>
                  </div>
                  <input
                    className="inputforms"
                    type="text"
                    id="username"
                    name="username"
                    required
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
                <div class="input-container">
                  <div>
                    <label for="password">
                      <h4 className="labelss">Password</h4>
                    </label>
                  </div>
                  <input
                    className="inputforms"
                    type="password"
                    id="password"
                    name="password"
                    required
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div>
                  <a
                    href="forgot-password.html"
                    className="forgot-password-link"
                  >
                    Forgot Password?
                  </a>
                </div>
                <div class="button-container">
                  <button
                    type="submit"
                    className="primary-btn"
                    onClick={handleSignIn}
                  >
                    Sign In
                  </button>
                  {error && <p className="error-message">{error}</p>}
                </div>
                <div>
                  <h6 className="register">
                    Don't have an account?{" "}
                    <a href="register.html" class="registerhere">
                      Register Here
                    </a>
                  </h6>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
