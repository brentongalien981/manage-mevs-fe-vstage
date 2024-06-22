import { useContext } from "react";
import FloatingAlertsContext from "../contexts/FloatingAlertsContext";

function useFloatingAlerts() {
  return useContext(FloatingAlertsContext);
}

export default useFloatingAlerts;