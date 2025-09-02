import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Helper to get cookie value
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

const Profile = () => {
 
  // Profile content here
  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      {/* Add your profile details and UI here */}
    </div>
  );
};

export default Profile;
