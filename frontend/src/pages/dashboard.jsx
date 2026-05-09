import "./dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">

      {/* HEADER */}
      <div className="dashboard-header">
        <h2>Online Voting</h2>
        <p>Manage and monitor all voting events</p>
      </div>

      {/* ACTION BAR */}
      <div className="dashboard-actions">
        <input type="text" placeholder="Find an election" />

        <select>
          <option>Filter by status</option>
          <option>Active</option>
          <option>Completed</option>
        </select>

        <button className="search-btn">Search</button>

        <div className="right-actions">
          <button className="secondary-btn">Archived</button>
          <button className="primary-btn">+ Create New</button>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Status</th>
              <th>ID</th>
              <th>Election Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Votes</th>
              <th>Action</th>
            </tr>
          </thead>

      
        </table>
      </div>

    </div>
  );
};

export default Dashboard;