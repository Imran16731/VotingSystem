import React from "react";
import "./voting.css";

export default function ElectionSetupPage() {
  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="header">
          <h1>Online Election Setup</h1>
          <p>Create and manage secure elections for your organization.</p>
        </div>

        <form className="form">

          {/* Election Info */}
          <section className="card">
            <h2>Election Information</h2>

            <div className="grid">
              <input type="text" placeholder="Election Title" />
              <input type="text" placeholder="Organization Name" />
            </div>
            <div className="grid2">
            <textarea placeholder="Description"></textarea></div>
          </section>

          {/* Location */}
          <section className="card">
            <h2>Location Information</h2>

            <div className="grid-3">
              <select>
                <option>Bangladesh</option>
                <option>India</option>
                <option>USA</option>
              </select>

              <input type="text" placeholder="City" />
              <input type="text" placeholder="Address" />
            </div>
          </section>

          {/* Schedule */}
          <section className="card">
            <h2>Voting Schedule</h2>

            <div className="grid">
              <input type="datetime-local" />
              <input type="datetime-local" />
            </div>
          </section>

          {/* Security */}
          <section className="card">
            <h2>Security Settings</h2>

            <div className="checkbox-grid">
              <label><input type="checkbox" /> Anonymous Voting</label>
              <label><input type="checkbox" /> Require Login</label>
              <label><input type="checkbox" /> Email Verification</label>
              <label><input type="checkbox" /> One Vote Per User</label>
            </div>
          </section>

          <button className="btn" type="submit">
            Create Election
          </button>

        </form>
      </div>
    </div>
  );
}
