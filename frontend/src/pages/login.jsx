/*import "./log_reg.css";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
const Login = () => {
  return (
    <>
    <div className="auth-container">
      <div className="auth-card">

        <h2>Welcome Back</h2>
        <p>Login to access your account</p>

        <form className="auth-form">
          <input type="email" placeholder="Email Address" />
          <input type="password" placeholder="Password" />

          <button type="submit">Login</button>
        </form>

        <p className="auth-link">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>

      </div>
    </div>
    <Footer />
    </>
  );
};

export default Login;*/

import "./log_reg.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  return (
    <div className="auth-wrapper">

      <div className="auth-box">

        {/* LEFT SIDE */}
        <div className="auth-left">
          <h2>Hey There!</h2>
          <p>
            Welcome Back <br />
            You are just one step away to your feed.
          </p>

          <p className="small-text">Don't have an account?</p>
          <Link to="/register">
            <button className="outline-btn">Sign Up</button>
          </Link>
        </div>

        <div className="auth-right">
          <h3>SIGN IN</h3>

          <form>
            <label>Email</label>
            <input type="email" placeholder="Enter your email" />

            <label>Password</label>
            <input type="password" placeholder="Enter password" />

            <div className="options">
              
              <span className="forgot">Forgot Password?</span>
            </div>

            <button className="login-btn">Sign In</button>
          </form>

          
        </div>

      </div>
    </div>
  );
};

export default Login;