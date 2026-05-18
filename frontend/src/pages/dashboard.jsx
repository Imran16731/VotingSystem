import "./dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-page">

      {/* SIDEBAR */}
      <div className="sidebar">

        <h2>CloudVote</h2>

        <ul>
          <li>Dashboard</li>
          <li>Create Election</li>
          <li>Candidates</li>
          <li>Voters</li>
          <li>Results</li>
          <li>Settings</li>
        </ul>

      </div>

      {/* MAIN CONTENT */}
      <div className="dashboard-content">

        <h1>Election Dashboard</h1>

        {/* OVERVIEW CARDS */}
        <div className="stats-container">

          <div className="stat-card">
            <h3>Active Elections</h3>
            <p>3</p>
          </div>

          <div className="stat-card">
            <h3>Total Votes</h3>
            <p>1,248</p>
          </div>

          <div className="stat-card">
            <h3>Candidates</h3>
            <p>12</p>
          </div>

        </div>

        {/* ELECTION INFO */}
        <div className="election-card">

          <h2>Created Election</h2>

          <p><strong>Organization:</strong> ABC University</p>

          <p><strong>Country:</strong> Bangladesh</p>

          <p><strong>Status:</strong> Active</p>

          <div className="dashboard-buttons">
            <button>Add Candidate</button>
            <button>Manage Voters</button>
            <button>View Results</button>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;