import React from "react";
import "./SettingsPage.css";
const SettingsPage = () => {
  return (
    <div className="SettingsPage">
      <div className="settings-page-container">
        <h2>Settings</h2>
        <div className="settings-content">
          <div className="input-wrapper">
            <label htmlFor="">Email</label>
            <div className="input-box-wrapper">
              <input className="input-box" type="text" />
            </div>
          </div>
          <div className="input-wrapper">
            <label htmlFor="">Password</label>
            <div className="password-input-box-wrapper">
              <input className="input-box" type="text" />
              <i class="fa-solid fa-pen"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
