import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./CandidateDetails.css";
import api from "../services/api";

const CandidateDetails = () => {

  const { candidateId } = useParams();

  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    loadCandidate();
  }, [candidateId]);


  const loadCandidate = async () => {

    try {

      setLoading(true);

      const data =
        await api.getCandidate(candidateId);

      setCandidate(data);

      setError("");

    } catch (err) {

      console.error(err);

      setError(
        err.message ||
        "Failed to load candidate."
      );

    } finally {

      setLoading(false);

    }
  };


  if (loading) {

    return (
      <div className="candidate-details-page">

        <h1>
          Loading Candidate...
        </h1>

      </div>
    );
  }


  if (error || !candidate) {

    return (
      <div className="candidate-not-found">

        <h1>
          Candidate Not Found
        </h1>

        <p>
          {error ||
            "The candidate does not exist."}
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
    <div className="candidate-details-page">

      <Link to="/events">
        ← Back to Events
      </Link>


      <div className="candidate-details-card">

        <div className="large-candidate-avatar">

          {candidate.name
            ?.charAt(0)
            .toUpperCase()}

        </div>


        <h1>
          {candidate.name}
        </h1>


        <p>
          <strong>Email:</strong>{" "}
          {candidate.email}
        </p>


        <p className="candidate-description">

          <strong>
            Information:
          </strong>

          <br />

          {candidate.information}

        </p>


        <div className="manifesto">

          <h3>
            Manifesto
          </h3>

          <p>
            {candidate.manifesto}
          </p>

        </div>


        <Link to="/events">

          <button
            className="back-events-btn"
          >
            Back to Voting Events
          </button>

        </Link>

      </div>

    </div>
  );
};

export default CandidateDetails;