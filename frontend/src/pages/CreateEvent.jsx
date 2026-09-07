import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CreateEvent.css";
import api from "../services/api";

const CreateEvent = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startTime: "",
    endTime: "",
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


    if (!formData.name.trim()) {

      setError("Event name is required.");

      return;
    }


    if (!formData.startTime ||
        !formData.endTime) {

      setError(
        "Start time and end time are required."
      );

      return;
    }


    const start =
      new Date(formData.startTime);

    const end =
      new Date(formData.endTime);


    if (start >= end) {

      setError(
        "End time must be after start time."
      );

      return;
    }


    try {

      setLoading(true);


      await api.createEvent({

        name: formData.name,

        description:
          formData.description,

        startTime:
          start.toISOString(),

        endTime:
          end.toISOString(),

      });


      alert(
        "Voting event created successfully!"
      );


      navigate("/events");


    } catch (err) {

      console.error(err);

      setError(
        err.message ||
        "Failed to create event."
      );

    } finally {

      setLoading(false);

    }
  };


  const token =
    localStorage.getItem("token");


  if (!token) {

    return (
      <div className="create-event-page">

        <div className="create-event-container">

          <h1>
            Login Required
          </h1>

          <p>
            You must login before creating
            a voting event.
          </p>

          <Link to="/login">

            <button
              className="create-event-btn"
            >
              Go to Login
            </button>

          </Link>

        </div>

      </div>
    );
  }


  return (
    <div className="create-event-page">

      <div className="create-event-container">

        <Link to="/events">
          ← Back to Events
        </Link>


        <h1>
          Create Voting Event
        </h1>


        <p>
          Create a new election or voting event.
        </p>


        {error && (

          <div className="error-message">

            {error}

          </div>

        )}


        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <label>
              Event Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="CSE Department Election 2026"
              required
            />

          </div>


          <div className="form-group">

            <label>
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              placeholder="Describe this voting event..."
            />

          </div>


          <div className="form-row">

            <div className="form-group">

              <label>
                Start Time
              </label>

              <input
                type="datetime-local"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                required
              />

            </div>


            <div className="form-group">

              <label>
                End Time
              </label>

              <input
                type="datetime-local"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                required
              />

            </div>

          </div>


          <button
            type="submit"
            className="create-event-btn"
            disabled={loading}
          >

            {loading
              ? "Creating..."
              : "Create Voting Event"}

          </button>

        </form>

      </div>

    </div>
  );
};

export default CreateEvent;