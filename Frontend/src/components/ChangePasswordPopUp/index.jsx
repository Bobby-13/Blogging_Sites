import React, { useState } from "react";
import "./ChangePasswordPopUp.css";
const ChangePasswordPopUp = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const handleSubmit = () => {};
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <div className="ChangePasswordPopUp">
      <div className="change-pass-container">
        <div className="change-pass-container-1">
        <i class="fa-solid fa-xmark"></i>
        </div>
        <div className="change-pass-container-2">
          <input
            type="text"
            name="oldPassword"
            value={formData.oldPassword}
            placeholder="Enter Old Password"
            onChange={handleOnChange}
          />
          <input
            type="text"
            name="newPassword"
            value={formData.newPassword}
            placeholder="New Password"
            onChange={handleOnChange}
          />
          <input
            type="text"
            name="confirmPassword"
            value={formData.confirmPassword}
            placeholder="Confirm Password"
            onChange={handleOnChange}
          />
          <button className="change-pass-btn" onClick={handleSubmit}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPopUp;
