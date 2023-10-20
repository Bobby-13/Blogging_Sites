import React from "react";
import "./AurthorRequestPopUp.css";
import { useMain } from "../../context/MainContext";
const AurthorRequestPopUp = () => {
  const mainContext = useMain();
  const handleCloseBtnClick = () => {};
  const handleSendBtnClick = () => {
    mainContext.handleSetMyAlertBox({
      ...mainContext.myAlertBox,
      visible: true,
      type: "success",
      message: "Request send to Admin",
    });
  };
  return (
    <div className="AurthorRequestPopUp">
      <div className="request-container">
        <div className="request-container-1">
          <i class="fa-solid fa-xmark" onClick={handleCloseBtnClick}></i>
        </div>
        <div className="request-container-2-wrapper">
          <div className="request-container-2">
            <h2>Your are a reader now</h2>
            <p>Send request to Admin to</p>
            <p>make you as Aurthor</p>
          </div>
          <div className="request-container-3">
            <button className="send-btn" onClick={handleSendBtnClick}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AurthorRequestPopUp;
