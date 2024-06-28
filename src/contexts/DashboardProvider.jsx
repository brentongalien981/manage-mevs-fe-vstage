import { useReducer } from "react";
import dashboardReducer from "../reducers/dashboardReducer";
import DashboardContext from "./DashboardContext";
import MyDateUtils from "../utils/MyDateUtils";

const initialState = {
  isQuerying: false,
  isResetting: false,
  error: null,
  rangeStartDateStr: MyDateUtils.getDateStringWithOffset(new Date(), -30), // 30 days ago
  rangeEndDateStr: MyDateUtils.getDateStringWithOffset(), // today
  periodFrequency: "Daily",
  ordersDataForCurrentDateRange: [],
  ordersDataForPreviousDateRange: [],
};

const DashboardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  return (
    <DashboardContext.Provider value={{ state, dispatch }}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;
