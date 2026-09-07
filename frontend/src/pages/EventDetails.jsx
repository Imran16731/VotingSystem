import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./EventDetails.css";
import api from "../services/api";

const EventDetails = () => {

  const { eventId } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadEvent();
  }, [eventId]);

  const loadEvent = async () => {
    try {
      setLoading(true);

      const data = await api.getEvent(eventId);

      setEvent(data);
      setError("");

    } catch (err) {
      console.error(err);

      setError(
        err.message || "Failed to load event."
      );

    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="event-details-page">
        <h1>Loading Event...</h1>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="event-not-found">

        <h1>Event Not Found</h1>

        <p>
          {error || "The voting event does not exist."}
        </p>

        <Link to="/events">
          <button>
            Back to Events
          </button>
        </Link>

      </div>
    );
  }

  return (
    <div className="event-details-page">

      {/* EVENT INFORMATION */}

      <div className="event-details-header">

        <Link to="/events">
          ← Back to Events
        </Link>

        <h1>
          {event.name}
        </h1>

        <p>
          {event.description}
        </p>

        <div className="event-info">

          <div>
            <strong>
              Start Date
            </strong>

            <span>
              {new Date(
                event.startTime
              ).toLocaleString()}
            </span>
          </div>

          <div>
            <strong>
              End Date
            </strong>

            <span>
              {new Date(
                event.endTime
              ).toLocaleString()}
            </span>
          </div>

          <div>
            <strong>
              Status
            </strong>

            <span
              className={
                event.status === "Active"
                  ? "event-active"
                  : ""
              }
            >
              {event.status}
            </span>
          </div>

        </div>

        {/* VOTE NOW */}

        {event.status === "Active" && (
          <div className="vote-now-container">

            <Link to={`/voting/${event.eventId}`}>
              <button className="vote-now-btn">
                Vote Now
              </button>
            </Link>

          </div>
        )}

      </div>


      {/* CANDIDATES */}

      <div className="candidates-section">

        <h2>
          Candidates
        </h2>

        {event.candidates &&
        event.candidates.length > 0 ? (

          <div className="candidates-grid">

            {event.candidates.map(
              (candidate) => (

                <div
                  className="candidate-card"
                  key={candidate.candidateId}
                >

                  <div className="candidate-avatar">
                    {candidate.name
                      ?.charAt(0)
                      .toUpperCase()}
                  </div>

                  <h3>
                    {candidate.name}
                  </h3>

                  <p>
                    {candidate.information}
                  </p>

                  <Link
                    to={`/candidates/${candidate.candidateId}`}
                  >
                    <button
                      className="candidate-btn"
                    >
                      View Candidate
                    </button>
                  </Link>

                </div>
              )
            )}

          </div>

        ) : (

          <div className="no-candidates">

            <p>
              No candidates have been added
              to this event yet.
            </p>

          </div>

        )}

      </div>

    </div>
  );
};

export default EventDetails;