import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./VotingEvents.css";
import api from "../services/api";

const VotingEvents = () => {

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    loadEvents();
  }, []);


  const loadEvents = async () => {

    try {

      setLoading(true);

      const data = await api.getEvents();

      setEvents(data);

      setError("");

    } catch (err) {

      console.error(err);

      setError(
        err.message ||
        "Failed to load voting events."
      );

    } finally {

      setLoading(false);

    }
  };


  if (loading) {

    return (
      <div className="voting-events-page">

        <div className="events-header">

          <h1>
            Voting Events
          </h1>

          <p>
            Loading voting events...
          </p>

        </div>

      </div>
    );
  }


  return (
    <div className="voting-events-page">

      <div className="events-header">

        <h1>
          Voting Events
        </h1>

        <p>
          Browse available elections and participate
          in the voting process.
        </p>

      </div>


      {error && (
        <div className="error-message">
          {error}
        </div>
      )}


      {events.length === 0 && !error && (

        <div className="no-events">

          <h2>
            No Voting Events
          </h2>

          <p>
            There are currently no voting events available.
          </p>

        </div>
      )}


      <div className="events-container">

        {events.map((event) => (

          <div
            className="event-card"
            key={event.eventId}
          >

            <div className="event-card-header">

              <h2>
                {event.name}
              </h2>

              <span
                className={
                  event.status === "Active"
                    ? "status active"
                    : event.status === "Completed"
                    ? "status completed"
                    : "status upcoming"
                }
              >
                {event.status}
              </span>

            </div>


            <p className="event-description">
              {event.description}
            </p>


            <div className="event-dates">

              <div>

                <strong>
                  Starts:
                </strong>

                <span>
                  {new Date(
                    event.startTime
                  ).toLocaleString()}
                </span>

              </div>


              <div>

                <strong>
                  Ends:
                </strong>

                <span>
                  {new Date(
                    event.endTime
                  ).toLocaleString()}
                </span>

              </div>

            </div>


            <div className="event-buttons">

              <Link
                to={`/events/${event.eventId}`}
              >
                <button className="view-event-btn">
                  View Event
                </button>
              </Link>


              {event.status === "Active" && (

                <Link
                  to={`/voting/${event.eventId}`}
                >
                  <button className="view-event-btn">
                    Vote Now
                  </button>
                </Link>

              )}


              <Link
                to={`/results/${event.eventId}`}
              >
                <button className="view-event-btn">
                  View Results
                </button>
              </Link>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default VotingEvents;