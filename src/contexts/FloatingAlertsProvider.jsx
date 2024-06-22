import { useState } from "react";
import FloatingAlertsContext from "./FloatingAlertsContext";

const FloatingAlertsProvider = ({ children }) => {
  // Sample alert object: { id: 1, message: "This is a success alert", variant: "danger" }
  const [alerts, setAlerts] = useState([]);

  function addAlert(alert) {
    setAlerts((prevAlerts) => [...prevAlerts, { ...alert, id: Date.now() }]);
  }

  return (
    <FloatingAlertsContext.Provider value={{ alerts, addAlert }}>
      {children}
    </FloatingAlertsContext.Provider>
  );
};

export default FloatingAlertsProvider;
