


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/homepage";
import Login from "./pages/login";
import Register from "./pages/register";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/Profile";  
import OnlineVoting from "./pages/voting";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/voting" element={<OnlineVoting />} />
      </Routes>
    </Router>
  );
}

export default App;