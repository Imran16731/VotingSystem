import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {

    const fetchProfile = async () => {

      const token = localStorage.getItem("token");

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

      } catch (error) {
        console.log("Error fetching profile", error);
      }

    };

    fetchProfile();

  }, []);

  return (
    <div>
      <h2>Profile Page</h2>

      {user ? (
        <div>
          <p>Name: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;