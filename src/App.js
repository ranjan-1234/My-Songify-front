import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import TopSongs from "./pages/TopSongs"; // ✅ Import your new page
import TopSingers from "./pages/TopSingers";

function App() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (data) => {
    localStorage.setItem("userData", JSON.stringify(data));
    setUserData(data);
    navigate("/dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    setUserData(null);
    navigate("/signin");
  };


  return (
    <div>
      {userData && <Navbar onLogout={handleLogout} />}
      <Routes>
        <Route path="/signin" element={<Signin onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={userData ? <Dashboard /> : <Navigate to="/signin" />}
        />
        <Route
          path="/profile"
          element={userData ? <Profile /> : <Navigate to="/signin" />}
        />
        {/* ✅ New Route for Top 50 Songs */}
        <Route
          path="/top-songs"
          element={userData ? <TopSongs /> : <Navigate to="/signin" />}
        />
        <Route
          path="/top-singers"
          element={userData ? <TopSingers /> : <Navigate to="/signin" />}
        />

        <Route path="/" element={<Navigate to="/signin" />} />
      </Routes>
    </div>
  );
}

export default App;
