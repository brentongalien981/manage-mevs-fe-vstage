import { NUM_TOP_COUNTRIES_DATA_TO_SHOW, prepareSortedOrdersDataByPeriodFrequency } from "../pages/dashboard/dashboardData";
import { extractDashboardStats, extractPreviousRangeDateStrings, prepareTopSalesDataByCountry } from "../pages/dashboard/dashboardUtils";

function dashboardReducer(state, action) {
  switch (action.type) {
    case "QUERY": return { ...state, data: action.payload };
    case "QUERY_REQUEST": return { ...state, isQuerying: true, error: null };
    case "QUERY_SUCCESS": return onQuerySuccess(state, action);
    case "QUERY_FAIL": return { ...state, isQuerying: false, error: action.error };
    case "HANDLE_TIMELINE_PARAM_CHANGE": return { ...state, [action.inputName]: action.inputValue };
    case "HANDLE_PERIO_FREQUENCY_CHANGE": return { ...state, periodFrequency: action.periodFrequency };
    default: throw new Error("Unknown action: " + action.type);
  }
}


function onQuerySuccess(state, action) {

  /* Set Statistics Data */
  const stats = extractDashboardStats(
    action.ordersDataForCurrentDateRange,
    action.ordersDataForPreviousDateRange
  );


  /* Set Sales Graph Data */
  // Set the previous range variables for chart comparisons.
  const { previousRangeStartDateStr, previousRangeEndDateStr } =
    extractPreviousRangeDateStrings(state.rangeStartDateStr, state.rangeEndDateStr);

  // For current range.
  const sortedOrdersDataByPeriodForCurrentRange =
    prepareSortedOrdersDataByPeriodFrequency(
      action.ordersDataForCurrentDateRange,
      state.rangeStartDateStr,
      state.rangeEndDateStr,
      state.periodFrequency
    );

  // For previous range.
  const sortedOrdersDataByPeriodForPreviousRange =
    prepareSortedOrdersDataByPeriodFrequency(
      action.ordersDataForPreviousDateRange,
      previousRangeStartDateStr,
      previousRangeEndDateStr,
      state.periodFrequency
    );


  /* Top Sales Data by Country */
  const topSalesDataByCountry = prepareTopSalesDataByCountry(
    action.ordersDataForCurrentDateRange
  ).slice(0, NUM_TOP_COUNTRIES_DATA_TO_SHOW);


  return {
    ...state,
    isQuerying: false,
    stats,
    sortedOrdersDataByPeriodForCurrentRange,
    sortedOrdersDataByPeriodForPreviousRange,
    topSalesDataByCountry
  };

}

export default dashboardReducer;