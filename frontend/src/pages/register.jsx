import "./log_reg.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Register = () => {

  // State variables
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Register function
  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:5273/api/auth/register",
        {
          username,
          email,
          password,
          confirmPassword
        }
      );

      alert(response.data.message);

      // Clear form after success
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

    } catch (error) {

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong");
      }

    }
  };

  return (
    <div className="auth-wrapper">

      <div className="auth-box">

        <div className="auth-left">
          <h2>Welcome!</h2>

          <p>
            Create your account <br />
            and start voting securely.
          </p>

          <p className="small-text">
            Already have an account?
          </p>

          <Link to="/login">
            <button className="outline-btn">
              Sign In
            </button>
          </Link>
        </div>

        <div className="auth-right">

          <h3>SIGN UP</h3>

          {/* IMPORTANT */}
          <form onSubmit={handleRegister}>

            <label>Full Name</label>

            <input
              type="text"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label>Confirm Password</label>

            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button className="login-btn" type="submit">
              Sign Up
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default Register;