import { useReducer } from "react";
import dashboardReducer from "../reducers/dashboardReducer";
import DashboardContext from "./DashboardContext";

const initialState = {
  periodFrequency: "Daily",
  stats: [
    {
      name: "totalSales",
      label: "Total Sales",
      value: 0.0,
      currency: "$",
      yearOnYearPercentage: 0.0,
    },
    {
      name: "numOrders",
      label: "Number of Orders",
      value: 0.0,
      currency: "",
      yearOnYearPercentage: 0.0,
    },
    {
      name: "numPendingOrders",
      label: "Pending Orders",
      value: 0.0,
      currency: "",
      yearOnYearPercentage: 0.0,
    },
  ],
};

function DashboardProvider({ children }) {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  return (
    <DashboardContext.Provider value={{ state, dispatch }}>
      {children}
    </DashboardContext.Provider>
  );
}

export default DashboardProvider;
