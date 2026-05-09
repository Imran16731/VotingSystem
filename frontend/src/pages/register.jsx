
{/*import "./log_reg.css";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const Register = () => {
  return (
    <>
    <div className="auth-container">
      <div className="auth-card">

        <h2>Create Account</h2>
        <p>Join CloudVote and start voting</p>

        <form className="auth-form">
          <input type="text" placeholder="Full Name" />
          <input type="email" placeholder="Email Address" />
          <input type="password" placeholder="Password" />
          <input type="password" placeholder="Confirm Password" />

          <button type="submit">Register</button>
        </form>

        <p className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Register;
*/}
import "./log_reg.css";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="auth-wrapper">

      <div className="auth-box">
        <div className="auth-left">
          <h2>Welcome!</h2>
          <p>
            Create your account <br />
            and start voting securely.
          </p>

          <p className="small-text">Already have an account?</p>
          <Link to="/login">
            <button className="outline-btn">Sign In</button>
          </Link>
        </div>
        <div className="auth-right">
          <h3>SIGN UP</h3>

          <form>
            <label>Full Name</label>
            <input type="text" placeholder="Enter your name" />

            <label>Email</label>
            <input type="email" placeholder="Enter your email" />

            <label>Password</label>
            <input type="password" placeholder="Enter password" />

            <label>Confirm Password</label>
            <input type="password" placeholder="Confirm password" />

            <button className="login-btn">Sign Up</button>
          </form>

        </div>

      </div>
    </div>
  );
};

export default Register;