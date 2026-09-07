import "./log_reg.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {

      const data = await api.login({
        email,
        password
      });

      // Save JWT token
      localStorage.setItem(
        "token",
        data.token
      );

      // Save user information
      localStorage.setItem(
        "userId",
        data.userId
      );

      localStorage.setItem(
        "username",
        data.username
      );

      localStorage.setItem(
        "email",
        data.email
      );

      localStorage.setItem(
        "role",
        data.role
      );

      alert(data.message || "Login successful");

      navigate("/");

    } catch (error) {

      console.error("Login error:", error);

      if (error.response) {

        setError(
          error.response.data?.message ||
          "Invalid email or password."
        );

      } else {

        setError(
          "Unable to connect to the server."
        );

      }

    } finally {

      setLoading(false);

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

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>

            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />


            <label>Password</label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />


            <div className="options">

              <span className="forgot">
                Forgot Password?
              </span>

            </div>


            <button
              className="login-btn"
              type="submit"
              disabled={loading}
            >

              {loading
                ? "Signing In..."
                : "Sign In"}

            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default Login;