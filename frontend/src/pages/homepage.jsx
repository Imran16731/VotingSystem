import { Link } from "react-router-dom";
import "./Home.css";
import  vote from "../assets/homepage.png";
import  lock from "../assets/security.png";
import  user from "../assets/user.png";
import Footer from "../components/Footer";
import start from "../assets/images.jpg";

const Home = () => {
  return (
    <>
  
    <div className="home">

      {/* main*/}
      <div className="hero">
        <div className="hero-left">
          <h1>
            Your trusted online <br />
            <span>voting platform</span>
          </h1>

          <p>
            Secure, scalable and real-time voting platform for modern systems.
          </p>

          <div className="hero-buttons">
            <Link to="/register">
              <button className="btn primary">Try for free</button>
            </Link>

            <button className="btn outline">Contact</button>
          </div>
        </div>

        <div className="hero-right">
          <img src={vote} alt="app preview" />
        </div>
      </div>
      {/* Features*/}
<div className="features">
  <h2>Elevate your voting experience</h2>

  <div className="features-grid">

    <div className="feature-card">
      <div className="feature-text">
         <h3>Security</h3>
         <p>
           Every vote is protected, secret <span>and verifiable.</span>
         </p>
      </div>

    <div className="feature-icon">
    <img src={lock} alt="security" />
  </div>
</div>

    <div className="feature-card">
      <div className="feature-text">
         <h3>One User One Vote</h3>
         <p>
          Ensures fairness by allowing only one vote per user
         </p>
      </div>

    <div className="feature-icon">
    <img src={user} alt="user" />
  </div>
</div>


   {/*<div className="feature-card">
      <div className="feature-text">
         <h3> Real-Time Results</h3>
         <p>
          Vote counts update instantly without refreshing
         </p>
      </div>

    <div className="feature-icon">
    <img src="/icons/lock.png" alt="security" />
  </div>
</div>*/}


    <div className="feature-card">
      <div className="feature-text">
         <h3> Live Dashboard</h3>
         <p>
          View ongoing results and voting statistics in real-time
         </p>
      </div>

    <div className="feature-icon">
    <img src={user} alt="user" />
  </div>
</div>
 <div className="feature-card">
      <div className="feature-text">
         <h3>Multiple Events</h3>
         <p>
          Run and manage multiple voting events simultaneously.
         </p>
      </div>

    <div className="feature-icon">
    <img src={user} alt="user" />
  </div>
</div>

  </div>
</div>
{/*<div className="how-it-works">
  <h2>How It Works</h2>

  <div className="steps">

    <div className="step">
      <div className="step-number">1</div>
      <h3>Create Account</h3>
      <p>Register securely using your email and password.</p>
    </div>

    <div className="step">
      <div className="step-number">2</div>
      <h3>Join Voting Event</h3>
      <p>Select an active voting event from the dashboard.</p>
    </div>

    <div className="step">
      <div className="step-number">3</div>
      <h3>Cast Your Vote</h3>
      <p>Vote once securely for your preferred candidate.</p>
    </div>

    <div className="step">
      <div className="step-number">4</div>
      <h3>View Results</h3>
      <p>See real-time results instantly after voting.</p>
    </div>

  </div>

  */}


  <div className="stats-section">

  {/* LEFT SIDE */}
  <div className="stats-left">
    <h2>Trusted Platform</h2>
    <p>
      CloudVote provides secure, scalable, and transparent online voting 
      trusted by thousands of users worldwide.
    </p>

    <button className="stats-btn">Learn More</button>
  </div>

  {/* RIGHT SIDE */}
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