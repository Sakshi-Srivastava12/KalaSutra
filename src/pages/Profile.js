import React from "react";
import "./Profile.css";

function Profile() {

  const user = localStorage.getItem("user")?.trim();


  const allProfiles = JSON.parse(localStorage.getItem("profiles")) || {};

  const userData = allProfiles[user];

  return (
    <div className="profile-page">

      <h2 className="profile-title">My Profile 👤</h2>

      <div className="profile-card">

        <div className="profile-avatar">👤</div>

        <div className="profile-row">
          <span>Email:</span>
          <span>{user}</span>
        </div>

        {userData ? (
          <>
            <div className="profile-row">
              <span>Name:</span>
              <span>{userData.firstName} {userData.lastName}</span>
            </div>

            <div className="profile-row">
              <span>Address:</span>
              <span>{userData.address}</span>
            </div>

            <div className="profile-row">
              <span>City:</span>
              <span>{userData.city}</span>
            </div>

            <div className="profile-row">
              <span>State:</span>
              <span>{userData.state}</span>
            </div>

            <div className="profile-row">
              <span>Pincode:</span>
              <span>{userData.pincode}</span>
            </div>
          </>
        ) : (
         <p className="no-data">
           No details found 😔 <br />
           Please complete checkout once to save your details
         </p>
        )}

        <div className="status-badge">
          Active ✅
        </div>

      </div>

    </div>
  );
}

export default Profile;