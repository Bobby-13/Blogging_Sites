import React, { useState } from "react";

import "./forgotPassword.css";
import { OtpComponent } from "./otpComponent";

function ForgotPassword() {
  const [otpComponent, setOtpComponent] = useState(false);
  const [emailId, setEmailId] = useState("");
  const handleClick = () => {
    setOtpComponent(!otpComponent);
    console.log(otpComponent);
  };

  return (
    <div className="ForgotPassword">
      <div className="PasswordContainer">
        <h3>Email Address</h3>
        {
          !otpComponent ? 
          <input
            type="email"
            value={emailId}
            className="contactEmail"
            onChange={(e) => setEmailId(e.target.value)}
          /> : 
          <input
            type="email"
            value={emailId}
            className="contactEmail"
            // onChange={() => setEmailId(e.target.value)}
            disabled
          /> 
        }
        {!otpComponent ? (
          <button className="sendOtp" onClick={handleClick}>
            Send Reset Code
          </button>
        ) : (
          <OtpComponent />
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
