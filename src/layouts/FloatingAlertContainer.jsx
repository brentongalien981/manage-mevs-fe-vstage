import { Alert } from "react-bootstrap";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFloatingAlerts from "../hooks/useFloatingAlerts";

const FloatingAlertContainer = () => {
  const { alerts } = useFloatingAlerts();

  return (
    <div style={myStyle}>
      {alerts.map((alert, index) => (
        <Alert key={index} variant={alert.variant ?? "primary"} dismissible>
          <div className="alert-icon">
            <FontAwesomeIcon icon={faCheckCircle} fixedWidth />
          </div>
          <div className="alert-message" style={alertMsgStyle}>
            {alert.message}
          </div>
        </Alert>
      ))}
    </div>
  );
};

const myStyle = {
  maxWidth: "720",
  position: "fixed",
  bottom: "20px",
  right: "20px",
};

const alertMsgStyle = {
  width: "100%",
  marginRight: "30px",
  wordWrap: "break-word",
  overflowWrap: "break-word",
};

export default FloatingAlertContainer;
