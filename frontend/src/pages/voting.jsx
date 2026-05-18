import "./voting.css";
import { useNavigate } from "react-router-dom";

const OnlineVoting = () => {

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Later you can save form data here

    navigate("/dashboard");
  };

  return (
    <div className="online-page">
      <div className="online-container">

        <h1>Welcome to the Election Manager</h1>

        <p className="intro-text">
          Create and manage secure online elections for your organization.
        </p>

        {/* STEP 1 */}
        <div className="form-card">

          <h2>Step 1. Your Organization</h2>

          <form className="organization-form">

            <div className="form-group">
              <label>Organization</label>
              <input
                type="text"
                placeholder="Organization Name"
              />
            </div>

            <div className="form-group">
              <label>Country</label>

              <select>
                <option>Bangladesh</option>
                <option>India</option>
                <option>USA</option>
              </select>
            </div>

            <div className="form-group">
              <label>Address</label>
              <input type="text" />
            </div>

            <div className="form-group">
              <label>City</label>
              <input type="text" />
            </div>

          </form>

        </div>

        <br />
        <br />

        {/* STEP 2 */}
        <div className="form-card">

          <h2>Step 2. Your Account</h2>

          <form
            className="organization-form"
            onSubmit={handleSubmit}
          >

            <div className="form-group">
              <label>Email</label>
              <input type="text" />
            </div>

            <div className="form-group">
              <label>Username</label>
              <input type="text" />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" />
            </div>

            <button
              type="submit"
              className="submit-btn"
            >
              Continue
            </button>

          </form>

        </div>

      </div>
    </div>
  );
};

export default OnlineVoting;