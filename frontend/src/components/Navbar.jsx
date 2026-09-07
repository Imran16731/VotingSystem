import { Link } from "react-router-dom";

const Navbar = () => {

  return (
    <nav className="navbar">

      <div className="navbar-logo">
        <Link to="/">
          CloudVote
        </Link>
      </div>


      <div className="navbar-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/events">
          Voting Events
        </Link>

        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/voting">
          Vote
        </Link>

        <Link to="/profile">
          Profile
        </Link>

      </div>


      <div className="navbar-auth">

        <Link to="/login">
          Login
        </Link>

        <Link to="/register">
          Register
        </Link>

      </div>

    </nav>
  );
};

export default Navbar;