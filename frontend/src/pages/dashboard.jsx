import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "./dashboard.css";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState({
    activeEvents: 0,
    totalVotes: 0,
    totalCandidates: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const [eventsData, statsData] = await Promise.all([
        api.getEvents(),
        api.getDashboardStats(),
      ]);

      setEvents(eventsData);
      setStats(statsData);
    } catch (err) {
      console.error("Dashboard error:", err);
      setError(err.message || "Failed to load dashboard.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">

      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Manage your voting activities from here.</p>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* ================= STAT CARDS ================= */}

      <div className="dashboard-stats">

        <div className="stat-card">
          <h3>{stats.activeEvents}</h3>
          <p>Active Elections</p>
        </div>

        <div className="stat-card">
          <h3>{stats.totalVotes}</h3>
          <p>Total Votes</p>
        </div>

        <div className="stat-card">
          <h3>{stats.totalCandidates}</h3>
          <p>Total Candidates</p>
        </div>

      </div>


      {/* ================= ACTIONS ================= */}

      <div className="dashboard-actions">

        <div className="dashboard-card">
          <h2>Create Election</h2>

          <p>
            Create a new election and configure
            its voting period.
          </p>

          <Link to="/create-event">
            <button>
              Create Election
            </button>
          </Link>
        </div>

        <div className="dashboard-card">
          <h2>Voting Events</h2>

          <p>
            View all elections and their current
            status.
          </p>

          <Link to="/events">
            <button>
              View Events
            </button>
          </Link>
        </div>

        <div className="dashboard-card">
          <h2>Online Voting</h2>

          <p>
            Participate in an active voting event.
          </p>

          <Link to="/voting">
            <button>
              Start Voting
            </button>
          </Link>
        </div>

      </div>


      {/* ================= EVENTS ================= */}

      <div className="dashboard-events">

        <div className="section-header">
          <h2>My Voting Events</h2>

          <Link to="/create-event">
            <button>
              + Create Election
            </button>
          </Link>
        </div>


        {events.length === 0 ? (

          <div className="no-events">
            <h3>No Voting Events</h3>

            <p>
              You have not created any voting events yet.
            </p>

            <Link to="/create-event">
              <button>
                Create Your First Election
              </button>
            </Link>
          </div>

        ) : (

          <div className="events-grid">

            {events.map((event) => (

              <div
                className="dashboard-event-card"
                key={event.eventId}
              >

                <div className="event-card-header">

                  <h3>
                    {event.name}
                  </h3>

                  <span
                    className={`status ${
                      event.status === "Active"
                        ? "active"
                        : event.status === "Completed"
                        ? "completed"
                        : "upcoming"
                    }`}
                  >
                    {event.status}
                  </span>

                </div>


                <p>
                  {event.description}
                </p>


                <div className="event-meta">

                  <div>
                    <strong>Starts:</strong>

                    <span>
                      {new Date(
                        event.startTime
                      ).toLocaleString()}
                    </span>
                  </div>

                  <div>
                    <strong>Ends:</strong>

                    <span>
                      {new Date(
                        event.endTime
                      ).toLocaleString()}
                    </span>
                  </div>

                </div>


                <div className="event-actions">

                  <Link
                    to={`/events/${event.eventId}`}
                  >
                    <button>
                      View Event
                    </button>
                  </Link>


                  <Link
                    to={`/events/${event.eventId}/add-candidate`}
                  >
                    <button>
                      Add Candidate
                    </button>
                  </Link>


                  <Link
                    to={`/events/${event.eventId}/results`}
                  >
                    <button>
                      Results
                    </button>
                  </Link>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default Dashboard;