import React from "react";
import "./UserInBoxPopUp.css";
const UserInBoxPopUp = () => {
  return <div className="UserInBoxPopUp">
    <h3>Inbox</h3>
    <div className="user-inbox-content">
      {
        <p className="message">Message 1</p>
      }
    </div>
  </div>;
};

export default UserInBoxPopUp;