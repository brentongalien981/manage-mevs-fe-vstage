import { useContext } from "react";
import DashboardContext from "../contexts/DashboardContext";

function useDashboard() {
  const { state, dispatch } = useContext(DashboardContext);

  // TODO: Do initial query of dashboard data.

  return { ...state };
}

export default useDashboard;