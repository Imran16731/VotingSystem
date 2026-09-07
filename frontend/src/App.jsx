import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Existing pages
import Home from "./pages/homepage";
import Login from "./pages/login";
import Register from "./pages/register";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/Profile";
import OnlineVoting from "./pages/voting";
import Voting from "./pages/voting";
// New pages
import CreateEvent from "./pages/CreateEvent";
import VotingEvents from "./pages/VotingEvents";
import EventDetails from "./pages/EventDetails";
import CandidateDetails from "./pages/CandidateDetails";
import EventResults from "./pages/EventResults";
import AddCandidate from "./pages/AddCandidate";
import Results from "./pages/Results";
function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Existing routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/voting" element={<OnlineVoting />} />

        {/* Voting Event routes */}
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/events" element={<VotingEvents />} />
        <Route path="/events/:eventId" element={<EventDetails />} />
        <Route
          path="/candidates/:candidateId"
          element={<CandidateDetails />}
        />
        <Route
          path="/events/:eventId/results"
          element={<EventResults />}
        />
        <Route
          path="/events/:eventId/add-candidate"
          element={<AddCandidate />}
        />
         <Route
          path="/voting/:eventId"
          element={<Voting />}
        />
        <Route
          path="/results/:eventId"
          element={<Results />}
        />
      </Routes>
    </Router>
  );
}

export default App;