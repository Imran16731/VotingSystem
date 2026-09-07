const API_BASE_URL = "http://localhost:5273/api";

const getToken = () => {
  return localStorage.getItem("token");
};

const api = {

  // =========================================================
  // AUTH
  // =========================================================

  register: async (data) => {

    const response = await fetch(
      `${API_BASE_URL}/Auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message || "Registration failed"
      );
    }

    return result;
  },


  login: async (data) => {

    const response = await fetch(
      `${API_BASE_URL}/Auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message || "Login failed"
      );
    }

    return result;
  },


  getProfile: async () => {

    const token = getToken();

    const response = await fetch(
      `${API_BASE_URL}/Auth/profile`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message || "Failed to get profile"
      );
    }

    return result;
  },


  // =========================================================
  // EVENTS
  // =========================================================

  getEvents: async () => {

    const response = await fetch(
      `${API_BASE_URL}/VotingEvent`
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message || "Failed to load events"
      );
    }

    return result;
  },


  getEvent: async (eventId) => {

    const response = await fetch(
      `${API_BASE_URL}/VotingEvent/${eventId}`
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message || "Failed to load event"
      );
    }

    return result;
  },


  createEvent: async (data) => {

    const token = getToken();

    const response = await fetch(
      `${API_BASE_URL}/VotingEvent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message || "Failed to create event"
      );
    }

    return result;
  },


  // =========================================================
  // CANDIDATES
  // =========================================================

  addCandidate: async (eventId, data) => {

    const token = getToken();

    const response = await fetch(
      `${API_BASE_URL}/VotingEvent/${eventId}/candidates`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message || "Failed to add candidate"
      );
    }

    return result;
  },


  getCandidate: async (candidateId) => {

    const response = await fetch(
      `${API_BASE_URL}/VotingEvent/candidates/${candidateId}`
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message || "Failed to load candidate"
      );
    }

    return result;
  },


  // =========================================================
  // DASHBOARD
  // =========================================================

  getDashboardStats: async () => {

    const token = getToken();

    const response = await fetch(
      `${API_BASE_URL}/Vote/dashboard-stats`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message ||
        "Failed to load dashboard statistics"
      );
    }

    return result;
  },


  // =========================================================
  // RESULTS
  // =========================================================

  getEventResults: async (eventId) => {

    const token = getToken();

    const response = await fetch(
      `${API_BASE_URL}/Vote/event/${eventId}/results`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message ||
        "Failed to load results"
      );
    }

    return result;
  },


  // =========================================================
  // CHECK USER VOTE
  // =========================================================

  hasVoted: async (eventId) => {

    const token = getToken();

    const response = await fetch(
      `${API_BASE_URL}/Vote/event/${eventId}/has-voted`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message ||
        "Failed to check voting status"
      );
    }

    return result;
  },


  // =========================================================
  // CAST VOTE
  // =========================================================

  castVote: async (data) => {

    const token = getToken();

    const response = await fetch(
      `${API_BASE_URL}/Vote`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message ||
        "Failed to cast vote"
      );
    }

    return result;
  },

};

export default api;