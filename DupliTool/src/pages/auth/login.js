import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./auth.css"
import { loginUser } from "services/authService";
import { toast } from "react-toastify";

export const LogIn = () => {
  const [credentials, setCredentials] = useState({});
  let navigate = useNavigate();

  const loginWithoutCredentials = () => {
    if(credentials.email && credentials.password) {
    loginUser(credentials.email, credentials.password, navigate)
    } else {
      toast.error("Please fill all the credentials")
    }
  }

  return (
    <div className="login-container flex-column">
      <h2 className="main-header">LOGIN</h2>
      <input
        type="email"
        className="input-box"
        placeholder="Enter your email"
        onChange={(e) => {
          setCredentials({ ...credentials, email: e.target.value });
        }}
      />
      <input
        type="password"
        className="input-box"
        placeholder="Enter your password"
        onChange={(e) => {
          setCredentials({ ...credentials, password: e.target.value });
        }}
      />
      <div className="terms-container flex">
        <input id="terms-input" type="checkbox" required/>
        <label htmlFor="terms-input">I accept all the terms and conditions</label>
      </div>

      <button className="hero-btn" 
      onClick={loginWithoutCredentials}
      >
        Login
      </button>
      <button className="outline-btn" 
      onClick={() => loginUser("vishrutapatil@gmail.com", "vishrutapatil", navigate)}
      >
        Login With Guest Credentials
      </button>
      <p className="gen-msg">
        Dont have an account,
        <Link className="primary-color" to="/signin">
          Sign In!
       </Link> 
      </p>
    </div>
  );
};
