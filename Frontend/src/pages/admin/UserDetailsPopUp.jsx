import React from "react";
import "./UserDetailsPopUp.css";

function UserDetailsPopUp({ setPopUpVisible,popUpDetails }) {
  return (
    <div className="UserDetailsPopUp">
      <button
        className="fa fa-cancel"
        id="popupCancelBDP"
        onClick={() => {
          setPopUpVisible(false);
        }}
      ></button>
      <div className="user-details-container">
        <h2>UserID : {popUpDetails.userId.userId}</h2>
        <h2>Username : {popUpDetails.userId.userName} </h2>
        <h2> UserType : {popUpDetails.userId.userType}</h2>
        <h2> Email :{popUpDetails.userId.email} </h2>
        <h2>Password : {popUpDetails.userId.password} </h2>
      </div>
    </div>
  );
}

export default UserDetailsPopUp;
