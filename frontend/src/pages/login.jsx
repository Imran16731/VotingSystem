import "./log_reg.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = () => {

  const navigate = useNavigate();

  // form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // login handler
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5273/api/auth/login",
        {
          email,
          password
        }
      );

      // success message from backend
      alert(response.data.message);

      // =========================
      // JWT TOKEN SAVE (IMPORTANT)
      // =========================
      localStorage.setItem(
        "token",
        response.data.token
      );

      // optional user info (for UI only)
      localStorage.setItem(
        "username",
        response.data.username
      );

      localStorage.setItem(
        "role",
        response.data.role
      );

      // redirect to home
      navigate("/");

    } catch (error) {

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Server not responding");
      }

    }
  };

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

          <p className="small-text">
            Don't have an account?
          </p>

          <Link to="/register">
            <button className="outline-btn">
              Sign Up
            </button>
          </Link>

        </div>

        {/* RIGHT SIDE */}
        <div className="auth-right">

          <h3>SIGN IN</h3>

          <form onSubmit={handleLogin}>

            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="options">
              <span className="forgot">
                Forgot Password?
              </span>
            </div>

            <button className="login-btn" type="submit">
              Sign In
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default Login;