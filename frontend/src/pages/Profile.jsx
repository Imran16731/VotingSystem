import { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";

const Profile = () => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No token found. Please login again.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:5273/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setUser(response.data);
        setLoading(false);

      } catch (err) {
        console.log(err.response?.data || err.message);
        setError("Failed to load profile. Please login again.");
        setLoading(false);
      }
    };

    fetchProfile();

  }, []);

  return (
    <div className="profile-page">

      <div className="profile-container">

        <div className="profile-header">
          <div className="profile-avatar">
            {user?.username?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h1>My Profile</h1>
            <p>Manage your CloudVote account information</p>
          </div>
        </div>

        {loading && (
          <div className="status-card">
            <p>Loading profile...</p>
          </div>
        )}

        {error && (
          <div className="status-card error-card">
            <p>{error}</p>
          </div>
        )}

        {user && (
          <div className="profile-card">

            <div className="info-box">
              <span className="label">Username</span>
              <p>{user.username}</p>
            </div>

            <div className="info-box">
              <span className="label">Email</span>
              <p>{user.email}</p>
            </div>

            <div className="info-box">
              <span className="label">Role</span>
              <p className="role-badge">{user.role}</p>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};

export default Profile;