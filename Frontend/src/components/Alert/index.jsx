import React, { useEffect, useState } from "react";
import "./Alert.css";
import { useMain } from "../../context/MainContext";

const Alert = ({
  type = "default",
  message = "Message",
  timeout = 4000,
  closeButton = false,
  setShowAlert,
}) => {
  const mainContext = useMain();
  const [open, setOpen] = useState(true);
  const [myStyle, setMyStyle] = useState({
    backgroundColor: "",
    color: "",
    symbol: "",
    message: "",
  });
  useEffect(() => {
    switch (type) {
      case "success":
        setMyStyle({
          backgroundColor: "#07BC0C",
          color: "#fff",
          symbol: "fa-solid fa-circle-check",
          message: message,
        });
        break;
      case "warning":
        setMyStyle({
          backgroundColor: "#F1C40F",
          color: "#fff",
          symbol: "fa-solid fa-circle-exclamation",
          message: message,
        });
        break;
      case "info":
        setMyStyle({
          backgroundColor: "#3498DB",
          color: "#fff",
          symbol: "fa-solid fa-circle-info",
          message: message,
        });
        break;
      case "error":
        setMyStyle({
          backgroundColor: "#E74C3C",
          color: "#fff",
          symbol: "fa-solid fa-circle-exclamation",
          message: message,
        });
        break;
      case "default":
        setMyStyle({
          backgroundColor: "grey",
          color: "#fff",
          symbol: "fa-solid fa-message",
          message: message,
        });
        break;
    }
    setTimeout(() => {
      setOpen(false);
      setShowAlert({
        ...mainContext.myAlertBox,
        visible: false
      });
    }, timeout);
  }, []);
  // if (open) {
    return (
      // <div className="Alert">
        <div
          className="alert-container"
          style={{
            backgroundColor: myStyle.backgroundColor,
            color: myStyle.color,
          }}
        >
          <div className="symbole-container">
          <i class={myStyle.symbol}></i>
          </div>
          <div className="message-container">
            <span className="message">{myStyle.message}</span>
          </div>
          {closeButton && (
            <button className="close-btn" onClick={() => setOpen(false)}>
              <span className="material-symbols-outlined" style={{ color: "#fff" }}>
                close
              </span>
            </button>
          )}
        </div>
      // </div>
    );
  // }
};

export default Alert;
