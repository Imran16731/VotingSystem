import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/homepage";
import Login from "./pages/login";
import Register from "./pages/register";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard"; 

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;