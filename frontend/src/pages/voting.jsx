import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./voting.css";
import api from "../services/api";

export default function Voting() {

  const { eventId } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  useEffect(() => {
    loadEvent();
  }, [eventId]);


  const loadEvent = async () => {

    try {

      setLoading(true);
      setError("");

      const data = await api.getEvent(eventId);

      setEvent(data);

    } catch (err) {

      console.error(err);

      setError(
        err.message || "Failed to load election."
      );

    } finally {

      setLoading(false);

    }
  };


  const handleVote = async (e) => {

    e.preventDefault();

    setError("");
    setSuccess("");


    if (!selectedCandidate) {

      setError(
        "Please select a candidate before voting."
      );

      return;
    }


    const token = localStorage.getItem("token");

    if (!token) {

      setError(
        "You must login before voting."
      );

      return;
    }


    try {

      setSubmitting(true);

      await api.castVote({

        eventId: Number(eventId),

        candidateId:
          Number(selectedCandidate),

      });


      setSuccess(
        "Your vote has been submitted successfully!"
      );


      setSelectedCandidate(null);


      setTimeout(() => {

        navigate(
          `/events/${eventId}`
        );

      }, 2000);


    } catch (err) {

      console.error(err);

      setError(
        err.message || "Failed to submit vote."
      );

    } finally {

      setSubmitting(false);

    }
  };


  if (loading) {

    return (
      <div className="page-wrapper">

        <div className="container">

          <h1>
            Loading Election...
          </h1>

        </div>

      </div>
    );
  }


  if (error && !event) {

    return (
      <div className="page-wrapper">

        <div className="container">

          <h1>
            Election Not Found
          </h1>

          <p>
            {error}
          </p>

          <Link to="/events">
            <button className="btn">
              Back to Events
            </button>
          </Link>

        </div>

      </div>
    );
  }


  if (!event) {
    return null;
  }


  return (

    <div className="page-wrapper">

      <div className="container">

        <div className="header">

          <Link to={`/events/${eventId}`}>
            ← Back to Election
          </Link>

          <h1>
            {event.name}
          </h1>

          <p>
            Select one candidate and submit your vote.
          </p>

        </div>


        {error && (

          <div className="error-message">
            {error}
          </div>

        )}


        {success && (

          <div className="success-message">
            {success}
          </div>

        )}


        <form
          className="form"
          onSubmit={handleVote}
        >

          <section className="card">

            <h2>
              Candidates
            </h2>


            {event.candidates &&
            event.candidates.length > 0 ? (

              <div className="candidate-list">

                {event.candidates.map(
                  (candidate) => (

                    <label
                      className={
                        selectedCandidate ===
                        candidate.candidateId
                          ? "candidate-option selected"
                          : "candidate-option"
                      }
                      key={candidate.candidateId}
                    >

                      <input
                        type="radio"
                        name="candidate"
                        value={candidate.candidateId}
                        checked={
                          selectedCandidate ===
                          candidate.candidateId
                        }
                        onChange={() =>
                          setSelectedCandidate(
                            candidate.candidateId
                          )
                        }
                      />

                      <div className="candidate-info">

                        <h3>
                          {candidate.name ||
                            `Candidate ${candidate.candidateId}`}
                        </h3>

                        <p>
                          {candidate.information ||
                            "No candidate information available."}
                        </p>

                        {candidate.manifesto && (

                          <p>
                            <strong>
                              Manifesto:
                            </strong>{" "}
                            {candidate.manifesto}
                          </p>

                        )}

                      </div>

                    </label>

                  )
                )}

              </div>

            ) : (

              <p>
                No candidates are available for this election.
              </p>

            )}

          </section>


          {event.candidates &&
          event.candidates.length > 0 && (

            <button
              className="btn"
              type="submit"
              disabled={submitting}
            >

              {submitting
                ? "Submitting Vote..."
                : "Submit Vote"}

            </button>

          )}

        </form>

      </div>

    </div>
  );
}