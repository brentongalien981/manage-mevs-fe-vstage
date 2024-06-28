import { useEffect, useReducer } from "react";
import dashboardReducer from "../reducers/dashboardReducer";
import DashboardContext from "./DashboardContext";
import {
  generateDashboardOrdersData,
  getNumDaysInPeriod,
  prepareSortedOrdersDataByPeriodFrequency,
} from "../pages/dashboard/dashboardData";
import MyDateUtils from "../utils/MyDateUtils";

// TODO: Delete.
const rangeStartDateStr = "2024-01-01";
const rangeEndDateStr = "2024-05-31";
const periodFrequency = "Weekly";
const numItems = 100;

// Set the previous range variables for chart comparisons.
const numDaysBetweenRange = MyDateUtils.getNumDayBetweenDates(
  rangeStartDateStr,
  rangeEndDateStr
);
const numYearsBetweenRange = Math.ceil(numDaysBetweenRange / 365);
const numDaysToGoBack = -1 * numYearsBetweenRange * 365;

const previousRangeStartDateStr = MyDateUtils.getDateStringWithOffset(
  new Date(rangeStartDateStr),
  numDaysToGoBack
);
const previousRangeEndDateStr = MyDateUtils.getDateStringWithOffset(
  new Date(rangeEndDateStr),
  numDaysToGoBack
);

const sampleOrdersData = generateDashboardOrdersData({
  numItems: numItems,
  rangeStartDateStr,
  rangeEndDateStr,
});

const sampleSortedOrdersDataByPeriod = prepareSortedOrdersDataByPeriodFrequency(
  sampleOrdersData,
  rangeStartDateStr,
  rangeEndDateStr,
  periodFrequency
);

const samplePreviousRangeOrdersData = generateDashboardOrdersData({
  numItems: numItems,
  rangeStartDateStr: previousRangeStartDateStr,
  rangeEndDateStr: previousRangeEndDateStr,
});

const samplePreviousRangeSortedOrdersDataByPeriod =
  prepareSortedOrdersDataByPeriodFrequency(
    samplePreviousRangeOrdersData,
    previousRangeStartDateStr,
    previousRangeEndDateStr,
    periodFrequency
  );

const initialState = {
  isQuerying: false,
  isResetting: false,
  error: null,
  rangeStartDateStr: rangeStartDateStr,
  rangeEndDateStr: rangeEndDateStr,
  periodFrequency: periodFrequency,
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
  // TODO: Delete: Fake data.
  ordersData: sampleOrdersData,
  previousRangeOrdersData: samplePreviousRangeOrdersData,
  sortedOrdersDataByPeriod: sampleSortedOrdersDataByPeriod,
  previousRangeSortedOrdersDataByPeriod:
    samplePreviousRangeSortedOrdersDataByPeriod,

  // Actual data.
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
