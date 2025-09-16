import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Signin.css";

function Signin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSignin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("https://songify-ranjan.onrender.com/api/AccountApi/Login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errText = await response.text();
        setError("❌ " + errText);
        return;
      }

      const data = await response.json();

      // ✅ Call the parent's login handler
      onLogin(data);
    } catch (err) {
      setError("❌ Network error: " + err.message);
    }

  };
  return (
    <div className="form-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSignin}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <p className="switch-link">
          Don’t have an account?{" "}
          <Link to="/signup" className="link">Sign Up</Link>
        </p>

        <button type="submit">Sign In</button>
        {error && <p className="message">{error}</p>}
      </form>
    </div>
  );
}

export default Signin;
