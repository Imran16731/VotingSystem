import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

const AddCandidate = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userId: "",
    information: "",
    manifesto: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!formData.userId) {
      setError("User ID is required.");
      return;
    }

    try {
      setLoading(true);

      await api.addCandidate(eventId, {
        userId: Number(formData.userId),
        information: formData.information,
        manifesto: formData.manifesto,
      });

      alert("Candidate added successfully!");

      navigate(`/events/${eventId}`);
    } catch (err) {
      console.error(err);

      setError(
        err.message || "Failed to add candidate."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-event-page">

      <div className="create-event-container">

        <Link to={`/events/${eventId}`}>
          ← Back to Event
        </Link>

        <h1>
          Add Candidate
        </h1>

        <p>
          Add an existing user as a candidate
          for this election.
        </p>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <label>
              Candidate User ID
            </label>

            <input
              type="number"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              placeholder="Enter User ID"
              required
            />

          </div>


          <div className="form-group">

            <label>
              Candidate Information
            </label>

            <textarea
              name="information"
              value={formData.information}
              onChange={handleChange}
              rows="4"
              placeholder="Enter candidate information..."
            />

          </div>


          <div className="form-group">

            <label>
              Manifesto
            </label>

            <textarea
              name="manifesto"
              value={formData.manifesto}
              onChange={handleChange}
              rows="6"
              placeholder="Enter candidate manifesto..."
            />

          </div>


          <button
            type="submit"
            disabled={loading}
            className="create-event-btn"
          >
            {loading
              ? "Adding..."
              : "Add Candidate"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default AddCandidate;