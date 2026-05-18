import { Link } from "react-router-dom";
import "./Home.css";

import vote from "../assets/homepage.png";
import lock from "../assets/security.png";
import userIcon from "../assets/user.png";

import Footer from "../components/Footer";
import start from "../assets/images.jpg";

const Home = () => {
  return (
    <>
      <div className="home">

        {/* HERO SECTION */}
        <div className="hero">

          <div className="hero-left">
            <h1>
              Your trusted online <br />
              <span>voting platform</span>
            </h1>

            <p>
              Secure, scalable and real-time voting platform for modern systems.
            </p>

            {/* BUTTONS */}
            <div className="hero-buttons">

              <Link to="/register">
                <button className="btn primary">
                  Try for free
                </button>
              </Link>

              <button className="btn outline">
                Contact
              </button>

              {/* 🔥 PROFILE BUTTON ADDED */}
              <Link to="/profile">
                <button className="btn profile-btn">
                  <img src={userIcon} alt="profile" />
                  Profile
                </button>
              </Link>

            </div>
          </div>

          <div className="hero-right">
            <img src={vote} alt="app preview" />
          </div>

        </div>

        {/* FEATURES SECTION */}
        <div className="features">
          <h2>Elevate your voting experience</h2>

          <div className="features-grid">

            <div className="feature-card">
              <div className="feature-text">
                <h3>Security</h3>
                <p>Every vote is protected, secret <span>and verifiable.</span></p>
              </div>
              <div className="feature-icon">
                <img src={lock} alt="security" />
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-text">
                <h3>One User One Vote</h3>
                <p>Ensures fairness by allowing only one vote per user</p>
              </div>
              <div className="feature-icon">
                <img src={userIcon} alt="user" />
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-text">
                <h3>Live Dashboard</h3>
                <p>View ongoing results and voting statistics in real-time</p>
              </div>
              <div className="feature-icon">
                <img src={userIcon} alt="user" />
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-text">
                <h3>Multiple Events</h3>
                <p>Run and manage multiple voting events simultaneously.</p>
              </div>
              <div className="feature-icon">
                <img src={userIcon} alt="user" />
              </div>
            </div>

          </div>
        </div>

        {/* STATS SECTION */}
        <div className="stats-section">

          <div className="stats-left">
            <h2>Trusted Platform</h2>
            <p>
              CloudVote provides secure, scalable, and transparent online voting
              trusted by thousands of users worldwide.
            </p>

            <button className="stats-btn">
              Learn More
            </button>
          </div>

          <div className="stats-right">

            <div className="stat-card">
              <h3>10K+</h3>
              <p>Active Voters</p>
            </div>

            <div className="stat-card">
              <h3>99.9%</h3>
              <p>Vote Accuracy</p>
            </div>

            <div className="stat-card">
              <h3>500+</h3>
              <p>Elections Held</p>
            </div>

            <div className="stat-card">
              <h3>24/7</h3>
              <p>Support Available</p>
            </div>

          </div>

        </div>

        {/* CTA SECTION */}
        <div className="cta-section">

          <div className="cta-box">

            <h2>Ready to make your voice count?</h2>

            <p>
              Join thousands of voters who trust CloudVote for secure and transparent elections.
            </p>

            <button className="cta-btn">
              Start Voting Now →
            </button>

          </div>

        </div>

        <Footer />

      </div>
    </>
  );
};

export default Home;