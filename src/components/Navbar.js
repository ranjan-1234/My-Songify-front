import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/signin");
  };
  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate("/dashboard")}>
        🎵 Home
      </div>
      <div className="nav-links">
        <Link to="/top-songs" className="nav-btn">Top 50 Songs</Link>
        <Link to="/top-singers" className="nav-btn">Top Singers</Link>
        <Link to="/prediction" className="nav-btn">Prediction</Link>
        <Link to="/profile" className="nav-btn">Profile</Link>
      </div>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;
