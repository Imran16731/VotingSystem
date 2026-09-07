import { Link } from "react-router-dom";
import "./Home.css";

import vote from "../assets/homepage.png";
import lock from "../assets/security.png";
import userIcon from "../assets/user.png";

import Footer from "../components/Footer";

const Home = () => {
  // Check whether the user is logged in
  const token = localStorage.getItem("token");

  // Get role saved during login
  const role = localStorage.getItem("role");

  return (
    <div className="home">

      {/* ================= HERO SECTION ================= */}
      <div className="hero">

        <div className="hero-left">

          <h1>
            Your trusted online <br />
            <span>voting platform</span>
          </h1>

          <p>
            Secure, scalable and real-time voting platform for modern systems.
          </p>


          {/* ================= HERO BUTTONS ================= */}
          <div className="hero-buttons">

            {/* Register */}
            {!token && (
              <Link to="/register">
                <button className="btn primary">
                  Try for free
                </button>
              </Link>
            )}


            {/* View Events */}
            <Link to="/events">
              <button className="btn outline">
                View Voting Events
              </button>
            </Link>


            {/* Create Election */}
            {token && (
              <Link to="/create-event">
                <button className="btn primary">
                  Create Election
                </button>
              </Link>
            )}


            {/* Profile */}
            {token && (
              <Link to="/profile">
                <button className="btn profile-btn">

                  <img
                    src={userIcon}
                    alt="profile"
                  />

                  Profile

                </button>
              </Link>
            )}

          </div>

        </div>


        <div className="hero-right">

          <img
            src={vote}
            alt="Online voting platform"
          />

        </div>

      </div>



      {/* ================= FEATURES ================= */}
      <div className="features">

        <h2>
          Elevate your voting experience
        </h2>


        <div className="features-grid">


          {/* Security */}
          <div className="feature-card">

            <div className="feature-text">

              <h3>
                Security
              </h3>

              <p>
                Every vote is protected, secret and verifiable.
              </p>

            </div>


            <div className="feature-icon">

              <img
                src={lock}
                alt="security"
              />

            </div>

          </div>



          {/* One User One Vote */}
          <div className="feature-card">

            <div className="feature-text">

              <h3>
                One User One Vote
              </h3>

              <p>
                Ensures fairness by allowing only one vote per user.
              </p>

            </div>


            <div className="feature-icon">

              <img
                src={userIcon}
                alt="user"
              />

            </div>

          </div>



          {/* Live Dashboard */}
          <div className="feature-card">

            <div className="feature-text">

              <h3>
                Live Dashboard
              </h3>

              <p>
                View ongoing results and voting statistics in real-time.
              </p>

            </div>


            <div className="feature-icon">

              <img
                src={userIcon}
                alt="dashboard"
              />

            </div>

          </div>



          {/* Multiple Events */}
          <div className="feature-card">

            <div className="feature-text">

              <h3>
                Multiple Events
              </h3>

              <p>
                Run and manage multiple voting events simultaneously.
              </p>

            </div>


            <div className="feature-icon">

              <img
                src={userIcon}
                alt="events"
              />

            </div>

          </div>

        </div>

      </div>



      {/* ================= STATS ================= */}
      <div className="stats-section">


        <div className="stats-left">

          <h2>
            Trusted Platform
          </h2>

          <p>
            CloudVote provides secure, scalable, and transparent online
            voting trusted by thousands of users worldwide.
          </p>


          <Link to="/events">

            <button className="stats-btn">
              View Elections
            </button>

          </Link>

        </div>



        <div className="stats-right">


          <div className="stat-card">

            <h3>
              10K+
            </h3>

            <p>
              Active Voters
            </p>

          </div>


          <div className="stat-card">

            <h3>
              99.9%
            </h3>

            <p>
              Vote Accuracy
            </p>

          </div>


          <div className="stat-card">

            <h3>
              500+
            </h3>

            <p>
              Elections Held
            </p>

          </div>


          <div className="stat-card">

            <h3>
              24/7
            </h3>

            <p>
              Support Available
            </p>

          </div>

        </div>

      </div>



      {/* ================= CTA ================= */}
      <div className="cta-section">


        <div className="cta-box">

          <h2>
            Ready to make your voice count?
          </h2>


          <p>
            Join thousands of voters who trust CloudVote for
            secure and transparent elections.
          </p>


          <Link to="/events">

            <button className="cta-btn">
              Start Voting Now →
            </button>

          </Link>

        </div>

      </div>



      {/* ================= FOOTER ================= */}
      <Footer />

    </div>
  );
};


export default Home;