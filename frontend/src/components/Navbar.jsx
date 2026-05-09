import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">CloudVote</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <div className="dropdown">
         <span className="nav-item">Services ▾</span>

        <div className="dropdown-menu">
  <Link to="/managed">Managed Elections</Link>
  <Link to="/dashboard">Online Voting</Link>
  <Link to="/telephone">Telephone Voting</Link>
  <Link to="/paper">Paper Ballot</Link>
  <Link to="/nominations">Nominations</Link>
</div>
        </div>

        <Link to="/login">Login</Link>
        <Link to="/register" className="btn-nav">Get Started</Link>
      </div>
    </nav>
  );
};

export default Navbar;