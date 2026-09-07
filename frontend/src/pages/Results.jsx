import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";
import "./Results.css";

const Results = () => {

  const { eventId } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    loadResults();
  }, [eventId]);


  const loadResults = async () => {

    try {

      setLoading(true);
      setError("");

      const result =
        await api.getEventResults(eventId);

      setData(result);

    } catch (err) {

      console.error(err);

      setError(
        err.message ||
        "Failed to load election results."
      );

    } finally {

      setLoading(false);

    }
  };


  if (loading) {

    return (
      <div className="results-page">

        <div className="results-container">

          <h1>
            Loading Results...
          </h1>

        </div>

      </div>
    );
  }


  if (error) {

    return (
      <div className="results-page">

        <div className="results-container">

          <h1>
            Unable to Load Results
          </h1>

          <p className="error-message">
            {error}
          </p>

          <Link to="/events">
            <button className="back-btn">
              Back to Events
            </button>
          </Link>

        </div>

      </div>
    );
  }


  const results = data?.results || [];


  const sortedResults = [...results].sort(
    (a, b) => b.voteCount - a.voteCount
  );


  const winner =
    sortedResults.length > 0 &&
    sortedResults[0].voteCount > 0
      ? sortedResults[0]
      : null;


  return (
    <div className="results-page">

      <div className="results-container">

        <div className="results-header">

          <Link to={`/events/${eventId}`}>
            ← Back to Election
          </Link>

          <h1>
            {data.eventName}
          </h1>

          <p>
            Election Results
          </p>

        </div>


        {/* SUMMARY */}

        <div className="results-summary">

          <div className="summary-card">

            <h3>
              Total Votes
            </h3>

            <strong>
              {data.totalVotes}
            </strong>

          </div>


          <div className="summary-card">

            <h3>
              Candidates
            </h3>

            <strong>
              {results.length}
            </strong>

          </div>


          <div className="summary-card">

            <h3>
              Status
            </h3>

            <strong>
              {data.eventStatus}
            </strong>

          </div>

        </div>


        {/* WINNER */}

        {winner && (

          <div className="winner-card">

            <div className="winner-label">
              WINNER
            </div>

            <h2>
              {winner.name}
            </h2>

            <p>
              {winner.voteCount} votes
              {" "}({winner.percentage}%)
            </p>

          </div>

        )}


        {/* RESULTS */}

        <div className="results-section">

          <h2>
            Candidate Results
          </h2>


          {sortedResults.length === 0 ? (

            <div className="no-results">

              <p>
                No candidates have been added
                to this election yet.
              </p>

            </div>

          ) : (

            <div className="results-list">

              {sortedResults.map(
                (candidate, index) => (

                  <div
                    className="result-card"
                    key={candidate.candidateId}
                  >

                    <div className="result-position">
                      #{index + 1}
                    </div>


                    <div className="result-info">

                      <h3>
                        {candidate.name}
                      </h3>

                      <p>
                        {candidate.information}
                      </p>


                      <div className="progress-container">

                        <div
                          className="progress-bar"
                          style={{
                            width: `${candidate.percentage}%`
                          }}
                        />

                      </div>

                    </div>


                    <div className="vote-count">

                      <strong>
                        {candidate.voteCount}
                      </strong>

                      <span>
                        votes
                      </span>

                      <small>
                        {candidate.percentage}%
                      </small>

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default Results;