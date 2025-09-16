import React from "react";
import "./Profile.css";

function Profile() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <p><strong>Email:</strong> {userData?.email}</p>
      <p><strong>User ID:</strong> {userData?.userId}</p>
    </div>
  );
}
export default Profile;
