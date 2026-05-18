import { useEffect, useState } from "react";
import axios from "axios";

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
    <div>
      <h2>Profile Page</h2>

      {loading && <p>Loading...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {user && (
        <div>
          <p>Name: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;