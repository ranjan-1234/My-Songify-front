import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // ✅ toggle password
  const [message, setMessage] = useState("");

  // ✅ Handle Signup request
  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("https://songify-app-kms7.onrender.com/api/AccountApi/Register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        setMessage(`❌ Error: ${errorText}`);
        return;
      }

      const data = await response.text();
      setMessage(`✅ ${data}`);
    } catch (error) {
      setMessage("❌ Network error: " + error.message);
    }

  };

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* ✅ Password input with toggle */}
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
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


        {/* ✅ Link to Sign In */}
        <p className="switch-link">
          Already have an account?{" "}
          <Link to="/signin" className="link">
            Sign In
          </Link>
        </p>

        <button type="submit">Sign Up</button>

        {/* ✅ Display API success/error messages */}
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}

export default Signup;
