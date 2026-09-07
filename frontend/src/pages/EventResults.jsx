import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";

const EventResults = () => {
  const { eventId } = useParams();

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadResults();
  }, [eventId]);

  const loadResults = async () => {
    try {
      setLoading(true);

      const data = await api.getEventResults(eventId);

      setResults(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError(
        err.message || "Failed to load results."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="event-details-page">
        <h1>Loading Results...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="event-not-found">
        <h1>Unable to Load Results</h1>

        <p>{error}</p>

        <Link to="/events">
          <button>Back to Events</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="event-details-page">

      <Link to={`/events/${eventId}`}>
        ← Back to Event
      </Link>

      <h1>
        {results.eventName}
      </h1>

      <h2>
        Total Votes: {results.totalVotes}
      </h2>

      {results.candidates.length === 0 ? (

        <p>
          No candidates have been added yet.
        </p>

      ) : (

        <div className="candidates-grid">

          {results.candidates.map((candidate) => (

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

              <h2>
                {candidate.votes} Votes
              </h2>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default EventResults;