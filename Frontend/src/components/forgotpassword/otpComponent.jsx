import { useState } from "react";
import "./otpComponent.css"
import { useNavigate } from "react-router-dom";

export function OtpComponent() {
  const [otp,setOtp] = useState(null);
  const navigate = useNavigate();
  const handleOnClick = () => {
    // otp api
    navigate("/login");
  }
    return (
      <div className="OTPContainer">
        <div className="otp-container">
        <h4>Enter OTP Code</h4>
        <input type="number" value={otp} className="otb-inbox-box" onChange={(e)=>setOtp(e.target.value)}/>
        {/* <form action="">
            <div className="input-field">
                <input type="number" disabled />
                <input type="number" disabled />
                <input type="number" disabled />
                <input type="number" disabled />
                <input type="number" disabled />
                <input type="number" disabled />
            </div>
          </form> */}
          <button onClick={handleOnClick} className="verify-otp-btn">Verify OTP</button>
        </div>
      </div>
    );
  }