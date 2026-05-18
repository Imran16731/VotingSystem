import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/homepage";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";   // ✅ ADD THIS

import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* ✅ PROFILE ROUTE ADDED */}
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;