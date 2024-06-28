function dashboardReducer(state, action) {
  switch (action.type) {
    case "QUERY": return { ...state, data: action.payload };
    case "QUERY_REQUEST": return { ...state, isQuerying: true, error: null };
    case "QUERY_SUCCESS": return { ...state, isQuerying: false, ordersDataForCurrentDateRange: action.ordersDataForCurrentDateRange, ordersDataForPreviousDateRange: action.ordersDataForPreviousDateRange };
    case "QUERY_FAIL": return { ...state, isQuerying: false, error: action.error };
    default: throw new Error("Unknown action: " + action.type);
  }
}

export default dashboardReducer;